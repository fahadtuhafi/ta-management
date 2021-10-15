const newBtn = document.getElementById('new')
const editBtn = document.getElementById('edit')
const deleteBtn = document.getElementById('delete')
const saveBtn = document.getElementById('save')
const cancelBtn = document.getElementById('cancel')
const firstBtn = document.getElementById('first')
const prevBtn = document.getElementById('previous')
const nextBtn = document.getElementById('next')
const lastBtn = document.getElementById('last')
const selectBtn = document.getElementById('select')
const fname = document.getElementById('fname')
const lname = document.getElementById('lname')
const studentId = document.getElementById('studentId')
const studentMajor = document.getElementById('major')
const studentSelected = document.getElementById('selected')
const logs = document.getElementById('logs')

const students = [
  {
    firstName: 'Fahad',
    lastName: 'Abdulhameed',
    id: '45',
    major: 'Programming',
    selected: false,
  },
  {
    firstName: 'Sara',
    lastName: 'W',
    id: '5',
    major: 'Programming',
    selected: false,
  },
  {
    firstName: 'Jack',
    lastName: 'A',
    id: '325',
    major: 'Programming',
    selected: false,
  },
]

let currentStudentIndex = 0
let edit = false

function clearInputs() {
  fname.value = ''
  lname.value = ''
  studentId.value = ''
  studentSelected.checked = false
}

function disableNavBtns(param) {
  firstBtn.disabled = param
  prevBtn.disabled = param
  nextBtn.disabled = param
  lastBtn.disabled = param
  selectBtn.disabled = param
}

function disableNewEditDeleteBtns(param) {
  newBtn.disabled = param
  editBtn.disabled = param
  deleteBtn.disabled = param
}

function disableSaveCancelBtns(param) {
  saveBtn.disabled = param
  cancelBtn.disabled = param
}

function updateLogs(student, action) {
  let text = `\n${action}: ${student.firstName} ${student.lastName}, ${student.id}, ${student.major}`
  logs.value += text
}

function constructStudent() {
  let student = {}
  student.firstName = fname.value
  student.lastName = lname.value
  student.id = studentId.value
  student.major = studentMajor.value
  student.selected = studentSelected.checked
  students.push(student)
  updateLogs(student, 'Added')
}

function retrieveStudent(student) {
  fname.value = student.firstName
  lname.value = student.lastName
  studentId.value = student.id
  studentMajor.value = student.major
  studentSelected.checked = student.selected
}
function editStudent() {
  let currentStudent = students[currentStudentIndex]
  currentStudent.firstName = fname.value
  currentStudent.lastName = lname.value
  currentStudent.id = studentId.value
  currentStudent.major = studentMajor.value
  currentStudent.selected = studentSelected.checked
}

clearInputs()
logs.value = ''

newBtn.addEventListener('click', (e) => {
  e.preventDefault()
  clearInputs()
  disableNewEditDeleteBtns(true)
  disableNavBtns(true)
  disableSaveCancelBtns(false)
  studentSelected.checked = false
})

editBtn.addEventListener('click', (e) => {
  e.preventDefault()
  if (!students.length) {
    return alert('There is no students to edit.')
  }
  edit = true
  disableNavBtns(true)
  disableNewEditDeleteBtns(true)
  disableSaveCancelBtns(false)
  retrieveStudent(students[currentStudentIndex])
})

deleteBtn.addEventListener('click', (e) => {
  e.preventDefault()
  if (!students.length) {
    return alert('There is no students to delete.')
  }
  let currentStudent = students[currentStudentIndex]
  let index = students.findIndex((student) => {
    return student.id === currentStudent.id
  })
  students.splice(index, 1)
  currentStudentIndex -= 1
  updateLogs(currentStudent, 'Removed')
})

saveBtn.addEventListener('click', (e) => {
  e.preventDefault()
  if (!fname.value || !lname.value || !studentId.value) {
    return alert('Please fill out the fields above.')
  }
  disableNavBtns(false)
  disableSaveCancelBtns(true)
  disableNewEditDeleteBtns(false)
  if (edit) {
    let currentStudent = students[currentStudentIndex]
    editStudent()
    updateLogs(currentStudent, 'Edited')
    edit = false
  } else {
    constructStudent()
  }
  clearInputs()
  console.log(students)
})

cancelBtn.addEventListener('click', (e) => {
  e.preventDefault()
  disableNewEditDeleteBtns(false)
  disableNavBtns(false)
})

firstBtn.addEventListener('click', (e) => {
  e.preventDefault()
  if (students.length) {
    currentStudentIndex = 0
    let currentStudent = students[currentStudentIndex]
    updateLogs(currentStudent, 'First')
  }
})

prevBtn.addEventListener('click', (e) => {
  e.preventDefault()
  if (currentStudentIndex >= 1) {
    currentStudentIndex -= 1
    let currentStudent = students[currentStudentIndex]
    updateLogs(currentStudent, 'Previous')
  }
})

nextBtn.addEventListener('click', (e) => {
  e.preventDefault()
  if (students.length >= 2 && currentStudentIndex < students.length - 1) {
    currentStudentIndex += 1
    let currentStudent = students[currentStudentIndex]
    updateLogs(currentStudent, 'Next')
  }
})

lastBtn.addEventListener('click', (e) => {
  e.preventDefault()
  if (students.length) {
    currentStudentIndex = students.length - 1
    let student = students[currentStudentIndex]
    updateLogs(student, 'Last')
  }
})

selectBtn.addEventListener('click', (e) => {
  e.preventDefault()
  if (students.length) {
    let student = students[Math.floor(Math.random() * students.length)]
    let studentIndex = students.findIndex((st) => st.id === student.id)
    students[studentIndex].selected = true
    updateLogs(student, 'Selected')
  }
})
