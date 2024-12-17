import React from "react";

const AboutUs = () => {
  return (
    <div className="container my-5">
      <div className="text-center mb-5">
        <h2 className="display-4 font-weight-bold">About Us</h2>
        <p className="lead">
          Connecting hearts, making a difference. Together, we build a better
          world.
        </p>
      </div>

      <div className="row">
        <div className="col-md-6">
          <img
            src="/DONATIONPORTAL.png"
            alt="About Us Image"
            className="img-fluid rounded"
            style={{ maxWidth: "80%", height: "80%" }}
          />
        </div>
        <div className="col-md-6">
          <p className="lead">
            Welcome to Donation Portal, a platform committed to fostering
            compassion and positive change. At Donation Portal, we believe in
            the transformative power of giving and aim to create a community
            where generosity knows no bounds.
          </p>

          <p>
            Our mission is to connect individuals and organizations with causes
            that matter. We prioritize transparency, accountability, and
            authenticity in every donation. Your trust is at the core of our
            values, and we strive to maintain the highest standards.
          </p>

          <p>
            Explore our platform, discover impactful causes, and be a part of
            the change you want to see. Your contributions, big or small, make a
            significant impact. Together, we can create a brighter future for
            those in need.
          </p>

          <p>
            Thank you for being an integral part of Donation Portal. Let's make
            a difference, one act of kindness at a time.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
