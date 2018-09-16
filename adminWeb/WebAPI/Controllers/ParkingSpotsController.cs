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
using System.Device.Location;

namespace WebApi.Controllers
{
    public class ParkingSpotsController : ApiController
    {
        private ParkingContainer db = new ParkingContainer();

        //// GET: api/ParkingSpots
        //public IQueryable<ParkingSpot> GetParkingSpots()
        //{
        //    return db.ParkingSpots;
        //}
        // GET: api/parkingspots?lat=30.4006491&lng=-96.0780337
        public object GetParkingSpots(float lat, float lng, int distance= 10000)
        {
            // 10 kilometers
            var result= db.ParkingSpots.AsEnumerable().Where(p=> new GeoCoordinate(p.Lat,p.Lon).GetDistanceTo(new GeoCoordinate(lat,lng))< distance);
            return result.Select(p => new 
            {
                Id = p.Id,
                Name = p.Name,
                Address = p.Address,
                City = p.City,
                ZipCode = p.ZipCode,
                State= p.State,
                Lat=p.Lat,
                Lon=p.Lon,
                NumberOfSpace=p.NumberOfSpace
            });
        }

        // GET: api/ParkingSpots/5
        [ResponseType(typeof(ParkingSpot))]
        public IHttpActionResult GetParkingSpot(int id)
        {
            ParkingSpot parkingSpot = db.ParkingSpots.Find(id);
           
            if (parkingSpot == null)
            {
                return NotFound();
            }
            var  allocated=db.Reservations.Where(r => r.ParkingSpotId == parkingSpot.Id && r.StartTime < DateTime.Now && r.EndTime > DateTime.Now );
            parkingSpot.NumberOfAvailableParking = parkingSpot.NumberOfSpace - allocated.Count();

            return Ok(new
            {
                Id = parkingSpot.Id,
                Name = parkingSpot.Name,
                Address = parkingSpot.Address,
                City = parkingSpot.City,
                ZipCode = parkingSpot.ZipCode,
                State = parkingSpot.State,
                Lat = parkingSpot.Lat,
                Lon = parkingSpot.Lon,
                NumberOfSpace = parkingSpot.NumberOfSpace,
                NumberOfAvailableParking=parkingSpot.NumberOfAvailableParking
            });
        }

        //// PUT: api/ParkingSpots/5
        //[ResponseType(typeof(void))]
        //public IHttpActionResult PutParkingSpot(int id, ParkingSpot parkingSpot)
        //{
        //    if (!ModelState.IsValid)
        //    {
        //        return BadRequest(ModelState);
        //    }

        //    if (id != parkingSpot.Id)
        //    {
        //        return BadRequest();
        //    }

        //    db.Entry(parkingSpot).State = EntityState.Modified;

        //    try
        //    {
        //        db.SaveChanges();
        //    }
        //    catch (DbUpdateConcurrencyException)
        //    {
        //        if (!ParkingSpotExists(id))
        //        {
        //            return NotFound();
        //        }
        //        else
        //        {
        //            throw;
        //        }
        //    }

        //    return StatusCode(HttpStatusCode.NoContent);
        //}

        //// POST: api/ParkingSpots
        //[ResponseType(typeof(ParkingSpot))]
        //public IHttpActionResult PostParkingSpot(ParkingSpot parkingSpot)
        //{
        //    if (!ModelState.IsValid)
        //    {
        //        return BadRequest(ModelState);
        //    }

        //    db.ParkingSpots.Add(parkingSpot);
        //    db.SaveChanges();

        //    return CreatedAtRoute("DefaultApi", new { id = parkingSpot.Id }, parkingSpot);
        //}

        //// DELETE: api/ParkingSpots/5
        //[ResponseType(typeof(ParkingSpot))]
        //public IHttpActionResult DeleteParkingSpot(int id)
        //{
        //    ParkingSpot parkingSpot = db.ParkingSpots.Find(id);
        //    if (parkingSpot == null)
        //    {
        //        return NotFound();
        //    }

        //    db.ParkingSpots.Remove(parkingSpot);
        //    db.SaveChanges();

        //    return Ok(parkingSpot);
        //}

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        //private bool ParkingSpotExists(int id)
        //{
        //    return db.ParkingSpots.Count(e => e.Id == id) > 0;
        //}
    }
}