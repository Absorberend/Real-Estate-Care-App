import React, {useEffect, useState} from "react"

import { useParams, useNavigate } from "react-router-dom";

import useFetch from "../../hooks/useFetch";
import useDelayed from "../../hooks/useDelayed";
import Damages from "../reportTypes/Damages";
import Installations from "../reportTypes/Installations";
import Maintenance from "../reportTypes/Maintenance";
import Modifications from "../reportTypes/Modifications";
import ErrorPage from "../../components/ErrorPage.js";



export default function EditReports({data, onReportsModalToggleClick, onCloseReportsModalClick, reportModalOpen, onSideMenuClose}) {
    const [filteredReport, setFilteredReport] = useState({});
    const [loading, setLoading] = useState(false);
    const {isPending, put} = useFetch();
    const Delayed = useDelayed();
    const navigate = useNavigate();
    let { reportId } = useParams();

    const handleSubmit = async (e, doc) => {
      e.preventDefault();
      setLoading(true);
      onSideMenuClose();
  
  
      if (reportModalOpen) {
        onCloseReportsModalClick();
      }
  
      setTimeout(() => {
        //The timeout prevents a bug on mobile where images don"t get uploaded when pressing the submit button to quickly after uploading the image.
        put("reports", reportId, doc);
        navigate("/");
        setLoading(false);
        onSideMenuClose();
        onCloseReportsModalClick();
      }, 1500)
    }

    useEffect(() => {

        if (data) {
            let filteredReportEL = data.filter(report => {
                return report.id === reportId
            })
            setFilteredReport(filteredReportEL[0]);
        }
    }, [data, reportId])

  return (<>
    {filteredReport?.category === "damages" && (
      <Damages 
        filteredReport={filteredReport} 
        onReportsModalToggleClick={onReportsModalToggleClick} 
        loading={loading} 
        onSubmit={handleSubmit} 
      />
    )}
    {filteredReport?.category === "installations" && (
      <Installations 
        filteredReport={filteredReport} 
        onReportsModalToggleClick={onReportsModalToggleClick} 
        loading={loading} 
        onSubmit={handleSubmit} 
      />
    )}
    {filteredReport?.category === "maintenance" && (
      <Maintenance 
        filteredReport={filteredReport} 
        onReportsModalToggleClick={onReportsModalToggleClick} 
        loading={loading} 
        onSubmit={handleSubmit} 
      />
    )}
    {filteredReport?.category === "modifications" && (
      <Modifications 
        filteredReport={filteredReport} 
        onReportsModalToggleClick={onReportsModalToggleClick} 
        loading={loading} 
        onSubmit={handleSubmit}  
      />
    )}
    {!isPending && reportId !== filteredReport?.id && (
      <Delayed>
        <ErrorPage onCloseReportsModalClick={onCloseReportsModalClick} />
      </Delayed>
    )}
    </>
  )
}
