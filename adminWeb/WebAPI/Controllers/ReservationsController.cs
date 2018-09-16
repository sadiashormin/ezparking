using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using adminWeb;

namespace WebApi.Controllers
{
    public class ReservationsController : ApiController
    {
        private ParkingContainer db = new ParkingContainer();

        // GET: api/Reservations
        public IQueryable<Reservation> GetReservations()
        {
            return db.Reservations;
        }

        // GET: api/Reservations/5
        [ResponseType(typeof(Reservation))]
        public IHttpActionResult GetReservation(int id)
        {
            Reservation reservation = db.Reservations.Find(id);
            if (reservation == null)
            {
                return NotFound();
            }

            return Ok(new
            {
                Id = reservation.Id,
                ParkingSpotId = reservation.ParkingSpotId,
                SpaceId = reservation.SpaceId,
                UserId = reservation.UserId,
                StartTime = reservation.StartTime,
                EndTime = reservation.EndTime,
            });
        }
        // Get all active reservation only. 
        // GET: api/Reservations/sadiashormin@gmail.com
        public object GetReservation(string email)
        {
           return  db.Users.Where(u=>u.Email==email).FirstOrDefault().Reservations.Where(r=> r.StartTime<DateTime.Now &&r.EndTime>DateTime.Now ).Select(reservation => new
           {
               Id = reservation.Id,
               ParkingSpotId = reservation.ParkingSpotId,
               SpaceId = reservation.SpaceId,
               UserId = reservation.UserId,
               StartTime = reservation.StartTime,
               EndTime = reservation.EndTime,
           });
        }

        // PUT: api/Reservations/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutReservation(int id, Reservation reservation)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != reservation.Id)
            {
                return BadRequest();
            }
            // All update will cause the reservation expire 
            // temporary fix. 
            reservation.EndTime = DateTime.Now;
            db.Entry(reservation).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ReservationExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Ok(reservation);
        }

        // POST: api/Reservations
        [ResponseType(typeof(Reservation))]
        public IHttpActionResult PostReservation(Reservation reservation)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            ParkingSpot parkingspot= db.ParkingSpots.Find(reservation.ParkingSpotId);
            var reservations = parkingspot.Reservations.Where(
                r => r.StartTime < DateTime.Now && r.EndTime > DateTime.Now); 

            var userReservationCount = db.Users.Where(u => u.Id == reservation.UserId).FirstOrDefault().
                Reservations.Where(r => r.StartTime < DateTime.Now && r.EndTime > DateTime.Now).Count();


            if (reservations.Count() < parkingspot.NumberOfSpace && userReservationCount== 0)
            {
                short spaceId = 0;
                for (short i = 1; i <= parkingspot.NumberOfSpace; i++) {
                    if (reservations.Where(r => r.SpaceId == i).Count() == 0) {
                        spaceId =i;
                        break;
                    }
                }

                reservation.SpaceId = spaceId;
                db.Reservations.Add(reservation);
                db.SaveChanges();
                return CreatedAtRoute("DefaultApi", new { id = reservation.Id }, new
                {
                    Id = reservation.Id,
                    ParkingSpotId = reservation.ParkingSpotId,
                    SpaceId = reservation.SpaceId,
                    UserId = reservation.UserId,
                    StartTime = reservation.StartTime,
                    EndTime = reservation.EndTime,
                });
            }
            else {
                return NotFound();
            }


           
        }

        // DELETE: api/Reservations/5
        [ResponseType(typeof(Reservation))]
        public IHttpActionResult DeleteReservation(int id)
        {
            Reservation reservation = db.Reservations.Find(id);
            if (reservation == null)
            {
                return NotFound();
            }

            db.Reservations.Remove(reservation);
            db.SaveChanges();

            return Ok(reservation);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool ReservationExists(int id)
        {
            return db.Reservations.Count(e => e.Id == id) > 0;
        }
    }
}