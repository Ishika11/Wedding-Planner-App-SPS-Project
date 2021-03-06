import React, { useState, useEffect } from "react";
import { getService } from "../../actions/service";
import { Grid, Container } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import ImageCarousel from "./ImageCarousel";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import { useParams } from "react-router-dom";
import CircularProgress from "@material-ui/core/CircularProgress";
import Reviews from "../Review/Reviews";
import "./spinner.css";

const ServicePage = () => {
  const id = useParams().id;
  const [service, setService] = useState("");
  const [loading, setLoading] = useState(true);

  const makeLocationString = (locations) =>
    locations.map((location) => location.name).join(", ");

  useEffect(() => {
    getService(id).then(({ data }) => {
      const serviceData = data.service;
      serviceData.locations = makeLocationString(serviceData.locations);
      setService(serviceData);
      setLoading(false);
    });
  }, [id]);

  if (!service || loading) {
    return (
      <div className="spinner">
        <CircularProgress color={"secondary"} size={100} />
      </div>
    );
  }
  return (
    <Container style={{ marginTop: "5%" }}>
      <Grid container spacing={4}>
        <Grid item sm={12} md={4}>
          {service.serviceImages ? (
            <ImageCarousel images={service.serviceImages} />
          ) : (
            ""
          )}
        </Grid>
        <Grid item sm={12} md={8}>
          <TableContainer component={Paper}>
            <h1>{service.name}</h1>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell>
                    <strong>Category</strong>
                  </TableCell>
                  <TableCell>{service.category}</TableCell>
                </TableRow>

                <TableRow>
                  <TableCell>
                    <strong>Price</strong>
                  </TableCell>
                  <TableCell>{`₹${service.priceEstimate} ${service.estimateUnit}`}</TableCell>
                </TableRow>

                <TableRow>
                  <TableCell>
                    <strong>Contact</strong>
                  </TableCell>
                  <TableCell>{service.contact}</TableCell>
                </TableRow>

                <TableRow>
                  <TableCell>
                    <strong>Locations</strong>
                  </TableCell>
                  <TableCell>{service.locations}</TableCell>
                </TableRow>

                <TableRow>
                  <TableCell>
                    <strong>Description</strong>
                  </TableCell>
                  <TableCell>{service.description}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
          <Reviews serviceId={id} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default ServicePage;
