let schedule = [
  { name: 'Bangun tidur & sholat subuh', start: '05:00', duration: 30, done: false },
  { name: 'Olahraga ringan', start: '05:30', duration: 30, done: false },
  { name: 'Mandi & sarapan', start: '06:00', duration: 45, done: false },
  { name: 'Berangkat kerja/sekolah', start: '07:00', duration: 30, done: false },
  { name: 'Kerja/Belajar sesi 1', start: '08:00', duration: 120, done: false },
  { name: 'Istirahat', start: '10:00', duration: 15, done: false },
  { name: 'Kerja/Belajar sesi 2', start: '10:15', duration: 105, done: false },
  { name: 'Istirahat siang & makan siang', start: '12:00', duration: 60, done: false },
  { name: 'Kerja/Belajar sesi 3', start: '13:00', duration: 180, done: false },
  { name: 'Istirahat sore', start: '16:00', duration: 30, done: false },
  { name: 'Olahraga/hobi', start: '16:30', duration: 60, done: false },
  { name: 'Pulang & bersih diri', start: '18:00', duration: 60, done: false },
  { name: 'Makan malam', start: '19:00', duration: 30, done: false },
  { name: 'Waktu keluarga/santai', start: '19:30', duration: 90, done: false },
  { name: 'Belajar/baca buku', start: '21:00', duration: 60, done: false },
  { name: 'Persiapan tidur', start: '22:00', duration: 30, done: false },
];

const taskName = document.getElementById('taskName');
const taskStart = document.getElementById('taskStart');
const taskDuration = document.getElementById('taskDuration');
const addButton = document.getElementById('addButton');
const scheduleList = document.getElementById('scheduleList');

function addMinutes(time, minutes) {
  const [hours, mins] = time.split(':').map(Number);
  const date = new Date(0, 0, 0, hours, mins + minutes);
  const endHours = String(date.getHours()).padStart(2, '0');
  const endMinutes = String(date.getMinutes()).padStart(2, '0');
  return `${endHours}:${endMinutes}`;
}

function isCurrent(start, end) {
  const now = new Date();
  const nowTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
  return nowTime >= start && nowTime < end;
}

function render() {
  schedule.sort((a, b) => a.start.localeCompare(b.start));

  scheduleList.innerHTML = '';

  schedule.forEach((task, index) => {
    const end = addMinutes(task.start, task.duration);

    const li = document.createElement('li');
    if (task.done) li.classList.add('done');
    if (isCurrent(task.start, end)) li.classList.add('current');

    const time = document.createElement('span');
    time.className = 'time';
    time.textContent = `${task.start} - ${end}`;

    const duration = document.createElement('span');
    duration.className = 'duration';
    duration.textContent = `${task.duration} menit`;

    const name = document.createElement('span');
    name.className = 'name';
    name.textContent = task.name;
    name.addEventListener('click', () => {
      task.done = !task.done;
      render();
    });

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Hapus';
    deleteButton.addEventListener('click', () => {
      schedule.splice(index, 1);
      render();
    });

    li.appendChild(time);
    li.appendChild(duration);
    li.appendChild(name);
    li.appendChild(deleteButton);
    scheduleList.appendChild(li);
  });
}

function addTask() {
  const name = taskName.value.trim();
  const start = taskStart.value;
  const duration = parseInt(taskDuration.value, 10);

  if (name === '' || start === '' || !duration || duration <= 0) return;

  schedule.push({ name, start, duration, done: false });
  render();

  taskName.value = '';
  taskStart.value = '';
  taskDuration.value = '';
}

addButton.addEventListener('click', addTask);

render();
setInterval(render, 30000);
