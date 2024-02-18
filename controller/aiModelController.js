const getDateAndPrioritize = (date) => {
// Call the function to schedule the task
  scheduleTask(date)
}

const scheduleTask = () => {
  // Define the date and time you want to execute your function
  const targetDate = getADayBeforeDay(date)

  // Schedule the function to be executed at the target date and time
  const job = schedule.scheduleJob(targetDate, function() {
      console.log('Executing your function at the target time.');
      // Call your function here
      prioritizeQueue();
  });

  // Function to be called at the target time
  function yourFunction() {
      console.log('Your function is being executed.');
  }
}


const prioritizeQueue = () => {
    const { spawn } = require('child_process');
  const path = require('path');
  const fs = require('fs');

  // Define the paths
  // const pythonScriptPath = path.join(__dirname, '..', 'ai_model', 'appointment_allocation.py');
  // const jsonDataPath = path.join(__dirname, '..', 'ai_model', 'patient_data.json');
  const pythonScriptPath = path.join(__dirname, '..', 'ai', 'appointment.py');
  const jsonDataPath = path.join(__dirname, '..', 'ai', 'patient.json');

  // Check if the JSON file exists
  if (!fs.existsSync(jsonDataPath)) {
    console.error('Error: patient_data.json not found');
    process.exit(1);
  }

  // Spawn a child process to run the Python script
  const pythonProcess = spawn('python', [pythonScriptPath]);

  // Listen for stdout data from the Python process
  pythonProcess.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`);
  });

  // Listen for stderr data from the Python process
  pythonProcess.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`);
  });

  // Listen for when the Python process exits
  pythonProcess.on('close', (code) => {
    console.log(`Python process exited with code ${code}`);
  });
}

prioritizeQueue()

const getADayBeforeDay = (date) => {
  const startDateString = date
  const startDate = new Date(startDateString)

  // Copy the start date
  const oneDayBeforeDate = new Date(startDate)

  // Subtract one day from the copy
  oneDayBeforeDate.setDate(oneDayBeforeDate.getDate() - 1)

  // Format the one day before date as a string
  const oneDayBeforeDateString = oneDayBeforeDate.toISOString();

  console.log('One day before start date:', oneDayBeforeDateString);
  return oneDayBeforeDate
}

module.exports = {getDateAndPrioritize}