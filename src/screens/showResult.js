import React, { useState, useEffect } from "react";
import { Bar, Line } from "react-chartjs-2";
import LoadingComponent from "../components/loading";
import { getResult } from "../function/getData"




function ShowResult() {
  const [isLoading, setisLoading] = useState(false);
  const [result, setResult] = useState({ one: 0, two: 0, three: 0, four: 0, five: 0, six: 0, seven: 0, eight: 0, nine: 0, ten: 0, eleven: 0, twelve: 0 })
  const [number, setNumber] = useState(0)
  const [student, setStudent] = useState({ a: 0, b: 0, c: 0, d: 0, e: 0, f: 0 })
  const [faculty, setFaculty] = useState({ allie: 0, anre: 0, arch: 0, bec: 0, dent: 0, edu: 0, en: 0, human: 0, inter: 0, law: 0, med: 0, medsci: 0, nurs: 0, phar: 0, publ: 0, sci: 0, social: 0 })

  const loadingData = async () => {
    var result = await getResult();
    // await console.log("loading", result.data);
    await setResult(result.data.AmountPerMonthPerson);
    setNumber(result.data.amount_person)
    setStudent(result.data.student_id)
    setFaculty(result.data.Faculty)
    await setisLoading(true);
  };

  const data = {
    labels: [
      "นิสิตปี 58",
      "นิสิตปี 59",
      "นิสิตปี 60",
      "นิสิตปี 61",
      "นิสิตปี 62",
      "นิสิตปี 63",
    ],
    datasets: [
      {
        label: "จำนวนคน",
        backgroundColor: "#FFAF00",
        borderWidth: 1,
        hoverBackgroundColor: "#FFC33F",
        data: [student.a, student.b, student.c, student.d, student.e, student.f],
      },
    ],
  };

  const dataByFaculty = {
    labels: [
      "เกษตรศาสตร์",
      "วิทยาศาสตร์",
      "วิศวกรรมศาสตร์",
      "สถาปัตยกรรมศาสตร์",
      "ทันตแพทยศาสตร์",
      "แพทยศาสตร์",
      "พยาบาลศาสตร์",
      "เภสัชศาสตร์",
      "วิทยาศาสตร์การแพทย์",
      "สหเวชศาสตร์",
      "สาธารณสุขศาสตร์",
      "มนุษยศาสตร์",
      "นิติศาสตร์",
      "บริหารธุรกิจ",
      "ศึกษาศาสตร์",
      "สังคมศาสตร์",
      "วิทยาลัยนานาชาติ",
    ],
    datasets: [
      {
        label: "จำนวนคน",
        backgroundColor: "#FFAF00",
        borderWidth: 1,
        hoverBackgroundColor: "#FFC33F",
        data: [faculty.anre, faculty.sci, faculty.en, faculty.arch, faculty.dent, faculty.med, faculty.nurs, faculty.phar, faculty.medsci, faculty.allie, faculty.publ, faculty.human, faculty.law, faculty.bec, faculty.edu, faculty.social, faculty.inter],
      },
    ],
  };

  const dataLine = {
    labels: [
      "มกราคม",
      "กุมภาพันธ์",
      "มีนาคม",
      "เมษายน",
      "พฤษภาคม",
      "มิถุนายน",
      "กรกฎาคม",
      "สิงหาคม",
      "กันยายน",
      "ตุลาคม",
      "พฤศจิกายน",
      "ธันวาคม",
    ],
    datasets: [
      {
        label: "จำนวนคน",
        borderColor: "#FFAF00",
        borderWidth: 2,
        data: [result.one, result.two, result.three, result.four, result.five, result.six, result.seven, result.eight, result.nine, result.ten, result.eleven, result.twelve],
      },
    ],
  };

  useEffect(() => {
    loadingData()
  }, []);

  if (isLoading) {
    return (
      <div className="nu-body-container">
        <LoadingComponent isLoading={isLoading} />
        <div className="nu-body-ctn-1">
          <div className="nu-body-ctn-1-2">
            <Bar
              data={data}
              width={100}
              height={50}
              options={{ maintainAspectRatio: false }}
            />
          </div>
          <div className="nu-body-ctn-1-3">
            <div>
              <h2 className="nu-body-ctn-text2">จำนวนคนที่ไม่สวมหมวกนิรภัย</h2>
            </div>
            <div className="nu-body-ctn-1-3-1">
              <h2 className="nu-body-ctn-text">{number} คน</h2>
            </div>
          </div>
        </div>
        <div className="nu-body-ctn-1">
          <div className="nu-body-ctn-4 nu-body-ctn-6">
            <Line
              data={dataLine}
              width={100}
              height={300}
              options={{ maintainAspectRatio: false }}
            />
          </div>
          <div className="nu-body-ctn-4 nu-body-ctn-5">
            <Bar
              data={dataByFaculty}
              width={100}
              height={50}
              options={{ maintainAspectRatio: false }}
            />
          </div>
        </div>
      </div>
    );
  } else {
    return null
  }
}

export default ShowResult;
