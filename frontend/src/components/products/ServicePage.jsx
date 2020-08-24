import React, { useState } from "react";
import { getService } from "../../actions/service";
import { useEffect } from "react";
import { Grid, Container } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import ImageCarousel from "./ImageCarousel";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import Button from "@material-ui/core/Button";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { useParams } from "react-router-dom";

const ServicePage = () => {
  const id = useParams().id;
  const [service, setService] = useState("");

  const makeLocationString = (locations) =>
    locations.map((location) => location.name).join(", ");

  useEffect(() => {
    getService(id).then(({ data }) => {
      const serviceData = data.service;
      serviceData.locations = makeLocationString(serviceData.locations);
      setService(serviceData);
    });
  }, [id]);

  return service === null ? (
    ""
  ) : (
    <Container style={{marginTop:'5%'}}>
    <Grid container spacing={4}>
      <Grid item sm={12} md={4}>
        {service.serviceImages ? (
          <ImageCarousel images={service.serviceImages} />
        ) : (
          ""
        )}
      </Grid>
      <Grid item sm={12} md={8} component={Paper}>
        <TableContainer>
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
      </Grid>
    </Grid>
    </Container>
  );
};

export default ServicePage;
