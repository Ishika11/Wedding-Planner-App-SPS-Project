import React, { useState } from "react";
import { getService } from "../../actions/service";
import { useEffect } from "react";
import { Grid, Container } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import ImageCarousel from "./ImageCarousel";

const ServicePage = ({ id }) => {
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

  return (
    <Grid container spacing={3}>
      <Grid item sm={12} md={4}>
        {service.serviceImages ? (
          <ImageCarousel images={service.serviceImages} />
        ) : (
          ""
        )}
      </Grid>
      <Grid item sm={12} md={8}>
        <Card>
          <Container>
            <h1>{service.name}</h1>
            <div>
              <span>Category:</span> {service.category}
            </div>
            <div>
              <span>Price:</span>{" "}
              {`₹${service.priceEstimate} ${service.estimateUnit}`}
            </div>
            <div>Contact: {service.contact}</div>
            <div>
              <span>Locations:</span> {service.locations}
            </div>
            <div>
              <span>Description:</span> {service.description}
            </div>
          </Container>
        </Card>
      </Grid>
    </Grid>
  );
};

export default ServicePage;
