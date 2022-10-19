import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';

import Damages from '../reportTypes/Damages';
import Installations from '../reportTypes/Installations';
import Maintenance from '../reportTypes/Maintenance';
import Modifications from '../reportTypes/Modifications';
import ErrorPage from "../../components/ErrorPage.js";
    

export default function EditReports({data}) {
    const [filteredReport, setFilteredReport] = useState({});
    const {loading} = useFetch();

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
    {filteredReport?.category === "damages" && <Damages filteredReport={filteredReport} reportId={reportId} />}
    {filteredReport?.category === "installations" && <Installations filteredReport={filteredReport} reportId={reportId} />}
    {filteredReport?.category === "maintenance" && <Maintenance filteredReport={filteredReport} reportId={reportId} />}
    {filteredReport?.category === "modifications" && <Modifications filteredReport={filteredReport} reportId={reportId} />}
    {filteredReport?.id !== reportId && !loading && <ErrorPage />}
    </>
  )
}
