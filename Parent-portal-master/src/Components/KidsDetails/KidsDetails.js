import React, { useEffect, useState, useContext } from "react";
import SideBar from "../SideBar/SideBar";
import { Container, Row, Col, Table, Spinner } from "react-bootstrap";
import { Link, useLocation, BrowserRouter as Router } from "react-router-dom";
import { DataContext } from "../Data";
import Hamburger from "../Hamburger/Hamburger";
import { Helmet } from "react-helmet";

import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const condition = Boolean(Math.round(Math.random()))


const KidsDetails = (props) => {
    const [data, setData] = useContext(DataContext);
    const [selectedKid, setSelectedKid] = useState([])
    const [user, setUser] = useState([]);
    const [userInfo, setUserInfo] = useState([]);
    const [childsMoodsOptions, setChildsMoodsOptions] = useState({})
    const [parentsMoodsOptions, setParentsMoodsOptions] = useState({})
    let kid_index = useLocation().pathname.split("/").pop()
    let childsMoodData = {}
    let parentsMoodData = {}


    console.log(kid_index)


    useEffect(() => {
        //fetch("http://localhost:5000/Appointment/"+kid_index)
        fetch("http://ec2-52-88-50-57.us-west-2.compute.amazonaws.com/Appointment/"+kid_index)
            .then((response) => response.json())
            .then((jsun) => {
                setSelectedKid(jsun)
                childsMoodData = jsun.childsMood.map(function(mood){ return [Date.UTC(mood.year,mood.month, mood.day),mood.score]})
                parentsMoodData = jsun.ParentsMood.map(function(mood){ return [Date.UTC(mood.year,mood.month, mood.day),mood.score]})

                setChildsMoodsOptions({
                    chart: {
                        type: 'spline'
                    },
                    rangeSelector: {
                        selected: 1
                    },
                    title: {
                        text: "Child's Mood"
                    },
                    series: [
                        {
                            // data: [[Date.UTC(2021, 1, 1),1],
                            //     [Date.UTC(2021, 1, 2),2],
                            //     [Date.UTC(2021, 1, 3),2],
                            //     [Date.UTC(2021, 1, 4),1],
                            //     [Date.UTC(2021, 1, 5),4],
                            //     [Date.UTC(2021, 1, 6),6]]
                            data: childsMoodData
                        }
                    ],
                    xAxis: {
                        type: 'datetime',
                        dateTimeLabelFormats: {
                            day: condition ? "%e-%b-%y" : "%e\%b\%y",
                            month: condition ? "%b-%y" : '%b \'%y'
                        }
                    }
                })

                setParentsMoodsOptions({
                    chart: {
                        type: 'spline'
                    },
                    rangeSelector: {
                        selected: 1
                    },
                    title: {
                        text: "Parents's Mood"
                    },
                    series: [
                        {
                            data: parentsMoodData
                        }
                    ],
                    xAxis: {
                        type: 'datetime',
                        dateTimeLabelFormats: {
                            day: condition ? "%e-%b-%y" : "%e\%b\%y",
                            month: condition ? "%b-%y" : '%b \'%y'
                        }
                    }
                })
            });
    }, []);
    console.log("Selected Kid:")
    console.log(selectedKid);




    useEffect(() => {
        if (data.length !== 0) {
            const uniq = [...new Set(data.map((x) => x.firstname))];
            setUser(uniq);
        }
    }, [data]);
    useEffect(() => {
        if (user.length !== 0) {
            const fake = user.map((x) => {
                const te = data.find((y) => y.firstname === x);
                return te;
            });
            setUserInfo(fake);
        }
    }, [user, data]);

    return (
        <Container fluid>
            <Helmet>
                <title>Patients List | Parents Portal</title>
                <meta name="description" content="Now a days All things are based on Online. Find a good doctor is so  much hassle  now a days.
        Doctors portal is going to give you advantage that you don't need to go hospital physically.You can book and get the best treatment from now ."/>
                <meta name="keywords" content="online doctors book appointment"/>
            </Helmet>
            <div className="main ml-6">
                <div className="d-md-block">
                    <SideBar></SideBar>
                </div>
                <div className="title__hamburger">
                    <h3 className="mt-3">Kids Details</h3>
                    <h4 className="mt-2">{selectedKid.firstname}</h4>
                    <Hamburger></Hamburger>
                </div>

                <div>
                    <HighchartsReact highcharts={Highcharts} options={childsMoodsOptions} />
                    <br/>
                    <HighchartsReact highcharts={Highcharts} options={parentsMoodsOptions} />
                </div>

            </div>
        </Container>
    );
};

export default KidsDetails;
