import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom';

import Damages from '../reportTypes/Damages';
import Installations from '../reportTypes/Installations';
import Maintenance from '../reportTypes/Maintenance';
import Modifications from '../reportTypes/Modifications';
import ErrorPage from "../../components/ErrorPage.js";
    

export default function EditReports({data}) {
    const [editReport, setEditReport] = useState(false);
    const [filteredReport, setFilteredReport] = useState({});
    let { reportId } = useParams();
    let filteredReportEL = [];

    useEffect(() => {
        if (data) {
            filteredReportEL = data.filter(report => {
                return report.id === reportId
            })
            setEditReport(true);
            setFilteredReport(filteredReportEL[0]);
        }
    }, [data])

    const handleEditStateClick = () => {
        setEditReport(prevEditReport => !prevEditReport);
    }

  return (<>
    {filteredReport?.category === "damages" && <Damages filteredReport={filteredReport} editReport={editReport} reportId={reportId} onEditStateClick={handleEditStateClick} />}
    {filteredReport?.category === "installations" && <Installations filteredReport={filteredReport} editReport={editReport} reportId={reportId} onEditStateClick={handleEditStateClick} />}
    {filteredReport?.category === "maintenance" && <Maintenance filteredReport={filteredReport} editReport={editReport} reportId={reportId} onEditStateClick={handleEditStateClick} />}
    {filteredReport?.category === "modifications" && <Modifications filteredReport={filteredReport} editReport={editReport} reportId={reportId} onEditStateClick={handleEditStateClick} />}
    {filteredReport?.category === undefined && <ErrorPage />}
    </>
  )
}
