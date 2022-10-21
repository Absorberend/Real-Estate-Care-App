import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';
import useDelayed from '../../hooks/useDelayed';

import Damages from '../reportTypes/Damages';
import Installations from '../reportTypes/Installations';
import Maintenance from '../reportTypes/Maintenance';
import Modifications from '../reportTypes/Modifications';
import ErrorPage from "../../components/ErrorPage.js";



export default function EditReports({data, onReportsModalToggleClick}) {
    const [filteredReport, setFilteredReport] = useState({});
    const {loading} = useFetch();
    const Delayed = useDelayed();
    let { reportId } = useParams();

    useEffect(() => {

        if (data) {
            let filteredReportEL = data.filter(report => {
                return report.id === reportId
            })
            setFilteredReport(filteredReportEL[0]);
        }
    }, [data, reportId])

  return (<>
    {filteredReport?.category === "damages" && <Damages filteredReport={filteredReport} reportId={reportId} onReportsModalToggleClick={onReportsModalToggleClick}/>}
    {filteredReport?.category === "installations" && <Installations filteredReport={filteredReport} reportId={reportId} onReportsModalToggleClick={onReportsModalToggleClick}/>}
    {filteredReport?.category === "maintenance" && <Maintenance filteredReport={filteredReport} reportId={reportId} onReportsModalToggleClick={onReportsModalToggleClick}/>}
    {filteredReport?.category === "modifications" && <Modifications filteredReport={filteredReport} reportId={reportId} onReportsModalToggleClick={onReportsModalToggleClick}/>}
    {!loading && reportId !== filteredReport?.id && <Delayed><ErrorPage /></Delayed>}
    </>
  )
}
