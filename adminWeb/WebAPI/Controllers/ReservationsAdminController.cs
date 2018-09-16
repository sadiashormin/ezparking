using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using adminWeb;

namespace WebApi.Controllers
{
    public class ReservationsAdminController : Controller
    {
        private ParkingContainer db = new ParkingContainer();

        // GET: ReservationsAdmin
        public ActionResult Index()
        {
            var reservations = db.Reservations.Include(r => r.ParkingSpot).Include(r => r.User);
            return View(reservations.ToList());
        }

        // GET: ReservationsAdmin/Details/5
        public ActionResult Details(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Reservation reservation = db.Reservations.Find(id);
            if (reservation == null)
            {
                return HttpNotFound();
            }
            return View(reservation);
        }

        // GET: ReservationsAdmin/Create
        public ActionResult Create()
        {
            ViewBag.ParkingSpotId = new SelectList(db.ParkingSpots, "Id", "Name");
            ViewBag.UserId = new SelectList(db.Users, "Id", "FirstName");
            return View();
        }

        // POST: ReservationsAdmin/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create([Bind(Include = "Id,ParkingSpotId,UserId,SpaceId,StartTime,EndTime")] Reservation reservation)
        {
            if (ModelState.IsValid)
            {
                db.Reservations.Add(reservation);
                db.SaveChanges();
                return RedirectToAction("Index");
            }

            ViewBag.ParkingSpotId = new SelectList(db.ParkingSpots, "Id", "Name", reservation.ParkingSpotId);
            ViewBag.UserId = new SelectList(db.Users, "Id", "FirstName", reservation.UserId);
            return View(reservation);
        }

        // GET: ReservationsAdmin/Edit/5
        public ActionResult Edit(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Reservation reservation = db.Reservations.Find(id);
            if (reservation == null)
            {
                return HttpNotFound();
            }
            ViewBag.ParkingSpotId = new SelectList(db.ParkingSpots, "Id", "Name", reservation.ParkingSpotId);
            ViewBag.UserId = new SelectList(db.Users, "Id", "FirstName", reservation.UserId);
            return View(reservation);
        }

        // POST: ReservationsAdmin/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit([Bind(Include = "Id,ParkingSpotId,UserId,SpaceId,StartTime,EndTime")] Reservation reservation)
        {
            if (ModelState.IsValid)
            {
                db.Entry(reservation).State = EntityState.Modified;
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            ViewBag.ParkingSpotId = new SelectList(db.ParkingSpots, "Id", "Name", reservation.ParkingSpotId);
            ViewBag.UserId = new SelectList(db.Users, "Id", "FirstName", reservation.UserId);
            return View(reservation);
        }

        // GET: ReservationsAdmin/Delete/5
        public ActionResult Delete(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Reservation reservation = db.Reservations.Find(id);
            if (reservation == null)
            {
                return HttpNotFound();
            }
            return View(reservation);
        }

        // POST: ReservationsAdmin/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(int id)
        {
            Reservation reservation = db.Reservations.Find(id);
            db.Reservations.Remove(reservation);
            db.SaveChanges();
            return RedirectToAction("Index");
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }
    }
}
