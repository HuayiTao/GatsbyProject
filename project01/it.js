import React from "react"
import "bootstrap/dist/css/bootstrap.min.css"
import jsonData from './it-2019.json'
import { Button, Table, Modal, Form } from 'react-bootstrap'
import { useLocalStorage } from "react-use"


export default function ITPage() {
  let [course, setCourse] = React.useState([])
  let [courseInfo, setCourseInfo] = React.useState("")
  let [grade, setGrade] = React.useState("")

  let [Semester, setCreateSemester] = useLocalStorage("SemesterIT", [])
  let [totalGpa, setTotalGpa] = useLocalStorage("totalGpaCS", 0)
  let [totalCourse, setTotalCourse] = useLocalStorage("totalCourseIT", 0)
  let [gradeList, setGrageList] = useLocalStorage("gradeListIT", [])
  let [gpa, setGpa] = useLocalStorage("gpaListIT", [])

  const [currentSemester, setCurrentSemester] = React.useState("");
  const [show, setShow] = React.useState(false);
  const handleClose = () => setShow(false)

  const handleShow = Course => {
    setShow(true);
    setCourseInfo(Course.target.value)
  }

  function createSemester() {
    Semester.push(Semester.length + 1)
    setCreateSemester([...Semester])
    console.table(Semester)
  }


  function clearSemester() {
    setCreateSemester([])
    setGrageList([])
    setTotalCourse(0)
    setTotalGpa(0)
    setGpa([])
    console.table(Semester)
  }

  function AddToSemester() {
    let p = grade
    console.log(p)
    let g = ""

    if (p == "4") {
      g = "A"
    }
    if (p == "3.75") {
      g = "A-"
    }
    if (p == "3.25") {
      g = "B+"
    }
    if (p == "3") {
      g = "B"
    }
    if (p == "2.75") {
      g = "B-"
    }
    if (p == "2.25") {
      g = "C+"
    }
    if (p == "2") {
      g = "C"
    }
    if (p == "1.75") {
      g = "C-"
    }
    if (p == "1") {
      g = "D"
    }
    if (p == "0") {
      g = "F"
    }
    if (p == "excluded") {
      g = "W"
    }
    if (grade && currentSemester) {
      gradeList.push({
        semester: currentSemester,
        course: courseInfo,
        grade: g,
        point: grade,
      })
      setGrade("")
      setCurrentSemester("")
      setTotalCourse(totalCourse + 1)
      setGrageList([...gradeList])
      setShow(false)
    }

    let TotalGpa = 0
    let TotalCourse = 0
    for (let i = 1; i <= Semester.length; i++) {
      let semesterGpa = 0
      let semesterCourse = 0

      {
        gradeList
          .filter(s => s.semester == i)
          .map(s => {
            if (s.rating == "W") {
              semesterGpa = semesterGpa
              TotalGpa = TotalGpa
              semesterCourse = semesterCourse
            } else {
              semesterGpa += s.point * 1 * 3
              TotalGpa += s.point * 1 * 3
              semesterCourse++
              TotalCourse++
            }
          })
      }
      semesterGpa = semesterGpa / (semesterCourse * 3)

      gpa[i - 1] = semesterGpa.toFixed(2)
      setGpa([...gpa])
      setTotalGpa(TotalGpa)
      setTotalCourse(TotalCourse)
    }
  }


  React.useEffect(async () => {
    let items = []
    for (let i = 0; i < jsonData.curriculum.subjects.length; i++) {
      items.push(
        <tr>
          <td>{jsonData.curriculum.subjects[i].groupName}</td>
          <td></td>
          <td></td>
        </tr>
      )
      for (let t = 0; t < jsonData.curriculum.subjects[i].subjects.length; t++) {
        var courseC = jsonData.curriculum.subjects[i].subjects[t].code
        var courseN = jsonData.curriculum.subjects[i].subjects[t].name
        var courseInfo = courseC + " " + courseN

        items.push(
          <tr>
            <td>{courseC}</td>
            <td>{courseN}</td>
            <td><Button variant='warning' onClick={handleShow} value={courseInfo}>+</Button></td>
          </tr>
        )
      }
      setCourse(items)
    }
  }, [])

  return (
    <>
      <div
        style={{
          float: 'right',
          height: '100%',
          width: '35%',
          backgroundColor: '#F8F8FF',
        }}
      >
        <div style={{ height: '30%', border: '1px', margin: '0 auto' }}>
          <h3 style={{ marginTop: '10px', textAlign: 'center' }}>Grade Overview</h3>
          <Button style={{ margin: '5px' }} onClick={createSemester}>Add</Button>
          <Button variant="danger" style={{ margin: '5px' }} onClick={clearSemester}>Clear</Button>
          <h4 style={{ borderTop: '2px', textAlign: 'right' }}> GPA: {(totalGpa / (totalCourse * 3)).toFixed(2)}</h4>

        </div>

        <div style={{ padding: '1rem', height: '70%', width: '100%', overflow: 'auto', border: '1px' }}>
          {Semester.map(item => {
            let sem = []
            let CourseGpa = []
            sem.push(<th>Semester {item}</th>)
            {
              gradeList
                .filter(s => s.semester == item)
                .map(s => {
                  CourseGpa.push(
                    <tr>
                      <td colSpan={2}>{s.course}</td>
                      <td style={{ textAlign: "right" }}>{s.grade}</td>
                    </tr>
                  )
                })
            }
            return (
              <Table striped>
                <thead>
                  <tr>{sem}</tr>
                </thead>
                <tbody>
                  {CourseGpa}
                  <tr>
                    <td colSpan={3} style={{ textAlign: "right", backgroundColor: '#ADD8E6' }}>
                      {gpa[item - 1]}
                    </td>
                  </tr>
                </tbody>
              </Table>
            )
          })}

        </div>

      </div>

      <div
        style={{
          float: 'left',
          height: '100%',
          width: '65%',
          borderLeft: '2px solid black',
          backgroundColor: '#C0C0C0',
          overflow: 'auto'
        }}
      >
        <h1 style={{ textAlign: 'center', marginTop: '20px' }}>Information Technology</h1>
        <Table>
          <tbody>
            {course}
          </tbody>
        </Table>
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{courseInfo}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Select Semester</Form.Label>
              <Form.Select required placeholder="Select Semester"
                onChange={e => setCurrentSemester(e.target.value)}
              >
                <option selected disabled>Select..</option>
                {Semester.map(item => {
                  return (<option value={item}>Semester {item}</option>)
                })}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Select Grade</Form.Label>
              <Form.Select placeholder="Select Grade"
                onChange={e => setGrade(e.target.value)}
              >
                <option selected disabled>Select..</option>
                <option value='4'>A</option>
                <option value='3.75'>A-</option>
                <option value='3.25'>B+</option>
                <option value='3'>B</option>
                <option value='2.75'>B-</option>
                <option value='2.25'>C+</option>
                <option value='2'>C</option>
                <option value='1.75'>C-</option>
                <option value='1'>D</option>
                <option value='0'>F</option>
                <option value='excluded'>W</option>
              </Form.Select>
            </Form.Group>
          </Form>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={AddToSemester}>
            Add to Semester
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )

}   