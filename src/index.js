const express = require('express')
const mongoose = require('mongoose');

const app = express()
const port = 8080

app.use(express.json())
mongoose.connect('mongodb+srv://josenetopereira380:FWr8S5oUlWzLmd8s@holiday-plans-managemen.y1nuls9.mongodb.net/?retryWrites=true&w=majority&appName=holiday-plans-management-api')
app.listen(port, () => {
  console.log('App running')
})

const holidayPlanParticipantSchema = new mongoose.Schema({
  avatar: String,
  name: String,
  email: String,
})

const holidayPlanSchema = new mongoose.Schema({
  title: String,
  description: String,
  date: String,
  location: String,
  participants: [holidayPlanParticipantSchema]
})

const HolidayPlanParticipant = mongoose.model('HolidayPlanParticipant', holidayPlanParticipantSchema)

const HolidayPlan = mongoose.model('HolidayPlan', holidayPlanSchema)

app.get('/holiday-plans', async (req, resp) => {
  const holidayPlans = await HolidayPlan.find()
  return resp.send(holidayPlans)
})

app.post('/holiday-plan-create', async (req, resp) => {
  const holidayPlan = new HolidayPlan({
    title: req.body.title,
    description: req.body.description,
    date: req.body.date,
    location: req.body.location,
    participants: req.body.participants
  })

  await holidayPlan.save()
  return resp.send(holidayPlan)
})

app.delete('/holiday-plan/:id', async(req, resp) => {
  const holidayPlan = await HolidayPlan.findByIdAndRemove(req.params.id)
  return resp.send(holidayPlan)
})

app.put('/holiday-plan/:id', async(req, resp) => {
  const holidayPlan = await HolidayPlan.findByIdAndUpdate(req.params.id,
    {
      title: req.body.title,
      description: req.body.description,
      date: req.body.date,
      location: req.body.location,
      participants: req.body.participants
    }, { new: true }
  )
  return resp.send(holidayPlan)
})