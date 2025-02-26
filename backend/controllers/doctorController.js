const Doctor = require("../models/Doctor");
const Appointment = require("../models/Appointment");
const moment = require("moment");

const getAllDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find();
    res.json(doctors);
  } catch (error) {
    res.status(500).json({ message: "Error fetching doctors", error });
  }
};

const getAvailableSlots = async (req, res) => {
  try {
    const { id } = req.params;
    const { date } = req.query;

    // Find the doctor
    const doctor = await Doctor.findById(id);
    if (!doctor) return res.status(404).json({ message: "Doctor not found" });

    // Convert date to start of the day
    const selectedDate = moment.utc(date, "YYYY-MM-DD").startOf("day");
    const startTime = moment.utc(`${date} ${doctor.workingHours.start}`, "YYYY-MM-DD HH:mm");
    const endTime = moment.utc(`${date} ${doctor.workingHours.end}`, "YYYY-MM-DD HH:mm");

    // Fetch all booked appointments for this doctor on the given date
    const appointments = await Appointment.find({
      doctorId: id,
      date: {
        $gte: selectedDate.toDate(),
        $lt: moment.utc(selectedDate).endOf("day").toDate(),
      },
    });

    // Convert booked appointments into an array of booked time slots
    let bookedSlots = appointments.map((appt) => ({
      start: moment.utc(appt.date),
      end: moment.utc(appt.date).add(appt.duration, "minutes"),
    }));

    // Generate all possible slots within working hours
    let availableSlots = [];
    let currentSlot = startTime.clone();

    while (currentSlot.isBefore(endTime)) {
      let nextSlot = currentSlot.clone().add(30, "minutes"); // Assume 30-min slots

      // Check if the slot is booked
      let isBooked = bookedSlots.some((slot) => 
        currentSlot.isBetween(slot.start, slot.end, null, "[)")
      );

      if (!isBooked && nextSlot.isBefore(endTime)) {
        availableSlots.push({
          start: currentSlot.format("HH:mm"),
          end: nextSlot.format("HH:mm"),
        });
      }

      currentSlot = nextSlot;
    }

    res.json({ doctor: doctor.name, availableSlots });
  } catch (error) {
    res.status(500).json({ message: "Error computing available slots", error });
  }
};

module.exports = { getAllDoctors, getAvailableSlots };
