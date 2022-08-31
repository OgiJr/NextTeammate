import Link from "next/dist/client/link";
import { Accordion, Nav, Tab } from "react-bootstrap";
import FooterContact from "../src/components/FooterContact";
import PageTitleBanner from "../src/components/PageTitleBanner";
import Layout from "../src/layout/Layout";

const Faq = () => {
  const accFun = ({ value }) => (
    <Accordion
      className="accordion accordion-style style_2 mb-xl-30"
      id="tutorialsaccordion"
      defaultActiveKey={`TutorialsItemOne${value}`}
    >
      <div className="card">
        <div className="card-header">
          <Accordion.Toggle
            as="button"
            className="btn btn-link"
            data-target={`TutorialsItemOne${value}`}
            eventKey={`TutorialsItemOne${value}`}
          >
            Interpretation
          </Accordion.Toggle>
        </div>
        <Accordion.Collapse
          id={`TutorialsItemOne${value}`}
          eventKey={`TutorialsItemOne${value}`}
          data-parent="#tutorialsaccordion"
        >
          <div className="card-body">
            The words of which the initial letteris capitalized have meanings
            defined under the following conditions. The following definitions
            shall have the same meaning regardless of whether they appear in
            singular or in plural.
          </div>
        </Accordion.Collapse>
      </div>
      <div className="card">
        <div className="card-header">
          <Accordion.Toggle
            as="button"
            className="btn btn-link"
            data-target="#TutorialsItemTwo"
            eventKey={`TutorialsItemTwo${value}`}
          >
            Definitions
          </Accordion.Toggle>
        </div>
        <Accordion.Collapse
          id={`TutorialsItemTwo${value}`}
          eventKey={`TutorialsItemTwo${value}`}
          data-parent="#tutorialsaccordion"
        >
          <div className="card-body">
            • &quot;Affiliate&quot; means an entity that controls, is controlled
            by or is under common control with a party, where
            &quot;control&quot; means ownership of 50% or more of the shares,
            equity interest or other securities entitled to vote for election of
            directors or other managing authority.<br></br>• &quot;Account&quot;
            means a unique account created for You to access our Service or
            parts of our Service.<br></br>• &quot;Company&#39; (referred to as
            either &quot;the Company&quot;,&quot;We&quot;, &quot;Us&quot; or
            &quot;Our&quot; in this Agreement) refers to [COMPANY_ INFORMATION].
            <br></br>• &quot;Country&#39;refers to Bulgaria.<br></br>•
            &quot;Content&#39;refers to content such as text, images, or other
            information that can be posted,uploaded, linked to or otherwise made
            available by You,regardless of the form of that content.<br></br>•
            &quot;Device&quot; means any device that can access the Service such
            as a computer,a cell phone or a digital tablet.<br></br>•
            &quot;Feedback&quot; means feedback, innovations or suggestions sent
            by You regarding the attributes, performance or features of our
            Service.<br></br>• &quot;Service&quot; refers to the Website.
            <br></br>• &quot;Terms and Conditions·(also referred as
            &#39;Terms&quot;) mean these Terms and Conditions that form the
            entire agreement between You and the Company regarding the use of
            the Service.<br></br>• &quot;Third-party Social Media Service&quot;
            means any services or content (including data,information, products
            or services) provided by a third-party that may be
            displayed,included or made available by the Service.<br></br>•
            &quot;Website&quot; refers to [WEBSITE_NAME]. accessible from
            [WEBSITE_URL]<br></br>• &quot;You&quot; means the individual
            accessing or using the Service, or the company, or other legal
            entity on behalf of which such individualis accessing or using the
            Service,as applicable.
          </div>
        </Accordion.Collapse>
      </div>
      <div className="card">
        <div className="card-header">
          <Accordion.Toggle
            as="button"
            className="btn btn-link"
            data-target="#TutorialsItemThree"
            eventKey={`TutorialsItemThree${value}`}
          >
            Acknowledgment
          </Accordion.Toggle>
        </div>
        <Accordion.Collapse
          id={`TutorialsItemThree${value}`}
          eventKey={`TutorialsItemThree${value}`}
          data-parent="#tutorialsaccordion"
        >
          <div className="card-body">
            These are the Terms and Conditions governing the use of this Service
            and the agreement that operates between You and the Company. These
            Terms and Conditions set out the rights and obligations of all users
            regarding the use of the Service. Your access to and use of the
            Service is conditioned on Your acceptance of and compliance with
            these Terms and Conditions. These Terms and Conditions apply to all
            visitors, users and others who access or use the Service. By
            accessing or using the Service You agree to be bound by these Terms
            and Conditions. If You disagree with any part of these Terms and
            Conditions then You may not access the Service . You represent that
            you are over the age of 18. The Company does not permit those under
            18 to use the Service. Your access to and use of the Service is also
            conditioned on Your acceptance of and compliance with the Privacy
            Policy of the Company. Our Privacy Policy describes Our policies and
            procedures on the collection, use and disclosure of Your personal
            information when You use the Application or the Website and tells
            You about Your privacy rights and how the law protects You. Please
            read Our Privacy Policy carefully before using Our Service.
          </div>
        </Accordion.Collapse>
      </div>
      <div className="card">
        <div className="card-header">
          <Accordion.Toggle
            as="button"
            className="btn btn-link"
            data-target="#TutorialsItemFour"
            eventKey={`TutorialsItemFour${value}`}
          >
            User Accounts
          </Accordion.Toggle>
        </div>
        <Accordion.Collapse
          id={`TutorialsItemFour${value}`}
          eventKey={`TutorialsItemFour${value}`}
          data-parent="#tutorialsaccordion"
        >
          <div className="card-body">
            When You create an account with Us, You must provide Us information
            that is accurate,complete, and current at all times. Failure to do
            so constitutes a breach of the Terms, which may result in immediate
            termination of Your account on Our Service. You are responsible for
            safeguarding the password that You use to access the Service and for
            any activities or actions under Your password,whether Your password
            is with Our Service or a Third-Party Social Media Service. You agree
            not to disclose Your password to any third party. You must notify Us
            immediately upon becoming aware of any breach of security or
            unauthorized use of Your account. You may not use as a username the
            name of another person or entity or that is not lawfully available
            for use,a name or trademark that is subject to any rights of another
            person or entity other than You without appropriate authorization,
            or a name that is otherwise offensive,vulgar or obscene.
          </div>
        </Accordion.Collapse>
      </div>
      <div className="card">
        <div className="card-header">
          <Accordion.Toggle
            as="button"
            className="btn btn-link"
            data-target="#TutorialsItemFive"
            eventKey={`TutorialsItemFive${value}`}
          >
            Content
          </Accordion.Toggle>
        </div>
        <Accordion.Collapse
          id={`TutorialsItemFive${value}`}
          eventKey={`TutorialsItemFive${value}`}
          data-parent="#tutorialsaccordion"
        >
          <div className="card-body">
            <h1 Your Right to Post Content h1>
              Your Right to Post Content
            </h1>
            <br></br>
            Our Service allows You to post Content. You are responsible for the
            Content that You post to the Service, including its legality,
            reliability, and appropriateness. By posting Content to the
            Service,You grant Us the right and license to use, modify,publicly
            perform, publicly display,reproduce,and distribute such Content on
            and through the Service. You retain any and all of Your rights to
            any Content You submit,post or display on or through the Service and
            You are responsible for protecting those rights. You agree that this
            license includes the right for Us to make Your Content available to
            other users of the Service, who may also use Your Content subject to
            these Terms. You represent and warrant that: (i) the Content is
            Yours (You own it) or You have the right to use it and grant Us the
            rights and license as provided in these Terms, and (ii) the posting
            of Your Content on or through the Service does not violate the
            privacy rights,publicity rights,copyrights,contract rights or any
            other rights of any person.
          </div>
        </Accordion.Collapse>
      </div>
      <div className="card">
        <div className="card-header">
          <Accordion.Toggle
            as="button"
            className="btn btn-link"
            data-target="#TutorialsItemSix"
            eventKey={`TutorialsItemSix${value}`}
          >
            Content Restrictions
          </Accordion.Toggle>
        </div>
        <Accordion.Collapse
          id={`TutorialsItemSix${value}`}
          eventKey={`TutorialsItemSix${value}`}
          data-parent="#tutorialsaccordion"
        >
          <div className="card-body">
            The Company is not responsible for the content of the Service&#39;s
            users. You expressly understand and agree that You are solely
            responsible for the Content and for all activity that occurs under
            your account, whether done so by You or any third person using Your
            account. You may not transmit any Content that is unlawful,
            offensive, upsetting, intended to disgust,threatening, libelous,
            defamatory, obscene or otherwise objectionable. Examples of such
            objectionable Content include, but are not limited to,the following:
            <br></br>
            <br></br>• Unlawful or promoting unlawful activity.<br></br>•
            Defamatory,discriminatory, or mean-spirited content, including
            references or commentary about religion, race, sexualorientation,
            gender, national/ethnic origin,or other targeted groups.<br></br>•
            Spam, machine - or randomly - generated, constituting unauthorized
            or unsolicited advertising, chain letters, any other form of
            unauthorized solicitation, or any form of lottery or gambling.
            <br></br>• Containing or installing any viruses,worms , malware,
            trojan horses, or other content that is designed or intended to
            disrupt, damage, or limit the functioning of any software, hardware
            or telecommunications equipment or to damage or obtain unauthorized
            access to any data or other information of a third person.<br></br>•
            Infringing on any proprietary rights of any party, including patent,
            trademark , trade secret,copyright, right of publicity or other
            rights.<br></br>• Impersonating any person or entity including the
            Company and its employees or representatives.<br></br>• Violating
            the privacy of any third person.<br></br>• False information and
            features .<br></br>
            <br></br>The Company reserves the right, but not the obligation,to,
            in its sole discretion, determine whether or not any Content is
            appropriate and complies with Terms,refuse or remove this Content.
            The Company further reserves the right to make formatting and edits
            and change the manner of any Content. The Company can also limit or
            revoke the use of the Service if You post such objectionable
            Content. As the Company cannot control all content posted by users
            and/or third parties on the Service,you agree to use the Service at
            your own risk. You understand that by using the Service You may be
            exposed to content that You may find offensive,indecent, incorrect
            or obje ctionable, and You agree that under no circumstances will
            the Company be liable in any way for any content, including any
            errors or omissions in any content, or any loss or damage of any
            kind incurred as a result of your use of any content.
          </div>
        </Accordion.Collapse>
      </div>
      <div className="card">
        <div className="card-header">
          <Accordion.Toggle
            as="button"
            className="btn btn-link"
            data-target="#TutorialsItemSeven"
            eventKey={`TutorialsItemSeven${value}`}
          >
            Content Backups
          </Accordion.Toggle>
        </div>
        <Accordion.Collapse
          id={`TutorialsItemSeven${value}`}
          eventKey={`TutorialsItemSeven${value}`}
          data-parent="#tutorialsaccordion"
        >
          <div className="card-body">
            Although regular backups of Content are performed, the Company does
            not guarantee there will be no loss or corruption of data. Corrupt
            or invalid backup points may be caused by, wit
            houtlimitation,Content that is corrupted prior to being backed up or
            that changes during the time a backup is performed. The Company will
            provide support and attempt to troubleshoot any known or discovered
            issues that may affect the backups of Content. But You acknowledge
            that the Company has no liability related to the integrity of
            Content or the failure to successfully restore Content to a usable
            state . You agree to maintain a complete and accurate copy of any
            Content in a location independent of the Service.
          </div>
        </Accordion.Collapse>
      </div>
    </Accordion>
  );
  return (
    <Layout>
      <PageTitleBanner pageName="Terms and Conditions" />
      <div className="section-padding faqs_elements">
        <div className="container relative z-1">
          <div className="row justify-content-center">
            <div className="col-xl-9 col-lg-11">
              <Tab.Container defaultActiveKey="general">
                <Nav className="nav nav-tabs style_3 wow fadeInUp">
                  <Nav.Item className="nav-item">
                    <Nav.Link
                      href="#"
                      eventKey="general"
                      className="nav-link"
                      data-toggle="tab"
                    >
                      Interpretation and Definitions
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item className="nav-item">
                    <Nav.Link
                      href="#"
                      eventKey="allcoach"
                      className="nav-link"
                      data-toggle="tab"
                    >
                      Copyright Policy
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item className="nav-item"></Nav.Item>
                </Nav>
                <Tab.Content className="tab-content wow fadeInDown">
                  <Tab.Pane className="tab-pane fade show" eventKey="general">
                    {accFun(1)}
                  </Tab.Pane>
                  <Tab.Pane className="tab-pane fade" eventKey="allcoach">
                    {accFun(2)}
                  </Tab.Pane>
                  <Tab.Pane className="tab-pane fade" eventKey="advisors">
                    {accFun(3)}
                  </Tab.Pane>
                  <Tab.Pane className="tab-pane fade" eventKey="tutorials">
                    {accFun(4)}
                  </Tab.Pane>
                </Tab.Content>
              </Tab.Container>
            </div>
          </div>
          <img
            src="assets/images/elements/element_10.png"
            alt="element"
            className="element_1 zoom-fade"
          />
          <img
            src="assets/images/elements/element_35.png"
            alt="element"
            className="element_2 zoom-fade"
          />
          <img
            src="assets/images/elements/element_36.png"
            alt="element"
            className="element_3 rotate_elem"
          />
          <img
            src="assets/images/elements/element_37.png"
            alt="element"
            className="element_4 rotate_elem"
          />
          <img
            src="assets/images/elements/element_38.png"
            alt="element"
            className="element_5 rotate_elem"
          />
        </div>
      </div>
      {/* Faqs End */}
      {/* Plane Start */}
      <div className="bg-thm-color-two plane_box relative z-1">
        <div className="container relative z-1">
          <div className="row justify-content-center">
            <div className="col-xl-9 col-lg-11 relative z-1">
              <img
                src="assets/images/elements/element_6.png"
                className="element_1 rotate_elem"
                alt="Element"
              />
              <h2 className="thm-color-white">
                The Life Coach School Has The Most Amazing Tools And
                Cutting-Edge Training
              </h2>
            </div>
          </div>
          <img
            src="assets/images/elements/element_7.png"
            className="element_2 zoom-fade"
            alt="Element"
          />
        </div>
      </div>
      {/* Plane End */}
      {/* Quote Form Start */}
      <section
        className="section-padding pb-0 section-bg quote_form_sec elements relative z-1"
        style={{ backgroundImage: "url(assets/images/bg/bg_7.jpg)" }}
      >
        <div className="container relative z-1">
          <div className="row flex-lg-row-reverse align-items-end justify-content-between">
            <div
              className="col-xl-5 col-lg-6 mb-md-80 wow fadeInRight"
              data-wow-delay=".30ms"
            >
              <img
                src="assets/images/quote_img.png"
                alt="img"
                className="image-fit-contain"
              />
            </div>
            <div className="col-lg-6">
              <div className="quote_box">
                <div className="section-title left-align white wow fadeInDown">
                  <p className="subtitle mb-4">
                    <i className="fal fa-book" />
                    Get In Touch
                  </p>
                  <h3 className="title">
                    Do You Have Any Questions Get Free Quote
                  </h3>
                </div>
                <form
                  onSubmit={(e) => e.preventDefault()}
                  className="wow fadeInUp"
                >
                  <div className="row">
                    <div className="col-lg-6">
                      <div className="form-group">
                        <input
                          type="text"
                          name="#"
                          className="form-control form-control-custom style_2"
                          placeholder="Your Name"
                          autoComplete="off"
                        />
                        <i className="fal fa-user" />
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="form-group">
                        <input
                          type="email"
                          name="#"
                          className="form-control form-control-custom style_2"
                          placeholder="Email Address"
                          autoComplete="off"
                        />
                        <i className="fal fa-envelope" />
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="form-group">
                        <input
                          type="text"
                          name="#"
                          className="form-control form-control-custom style_2"
                          placeholder="Phone Number"
                          autoComplete="off"
                        />
                        <i className="fal fa-phone" />
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="form-group">
                        <select
                          className="form-control form-control-custom style_2"
                          name="#"
                          defaultValue="option"
                        >
                          <option selected>Subject</option>
                          <option value="option 1">Option 1</option>
                          <option value="option 2">Option 2</option>
                          <option value="option 3">Option 3</option>
                        </select>
                        <i className="fal fa-chevron-down" />
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <div className="form-group">
                        <textarea
                          className="form-control form-control-custom style_2"
                          placeholder="Write Message"
                          rows={5}
                          defaultValue={""}
                        />
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <Accordion.Toggle
                        as="button"
                        type="submit"
                        className="thm-btn bg-thm-color-three thm-color-three-shadow btn-rectangle"
                      >
                        Send Message <i className="fal fa-chevron-right ml-2" />
                      </Accordion.Toggle>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <img
            src="assets/images/elements/element_39.png"
            alt="element"
            className="element_1 rotate_elem"
          />
          <img
            src="assets/images/elements/element_40.png"
            alt="element"
            className="element_2 zoom-fade"
          />
          <img
            src="assets/images/elements/element_41.png"
            alt="element"
            className="element_3 rotate_elem"
          />
          <img
            src="assets/images/elements/element_42.png"
            alt="element"
            className="element_4 rotate_elem"
          />
        </div>
      </section>
      {/* Quote Form End */}
      {/* Portfolio Start */}
      <section className="section-padding">
        <div className="container">
          <div className="row align-items-end">
            <div className="col-lg-7">
              <div className="section-title left-align wow fadeInLeft">
                <p className="subtitle">
                  <i className="fal fa-book" />
                  Project Gallery
                </p>
                <h3 className="title">
                  We Have 34520+ Project Successfully Done
                </h3>
              </div>
            </div>
            <div className="col-lg-5 text-left text-lg-right wow fadeInRight">
              <Link href="/portfolio-grid">
                <a className="thm-btn bg-thm-color-white thm-color-one btn-border btn-rectangle mb-xl-60">
                  View All Project
                  <i className="fal fa-chevron-right ml-2" />
                </a>
              </Link>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-6">
              <div className="portfolio_box wow fadeInUp">
                <div className="portfolio_img">
                  <img
                    src="assets/images/portfolio/1.jpg"
                    className="image-fit"
                    alt="img"
                  />
                </div>
                <div className="portfolio_caption">
                  <div className="text_box">
                    <h4 className="title mb-0">
                      <Link href="/portfolio-details">
                        How To Gain Knowledge
                      </Link>
                    </h4>
                    <p>Business Coach</p>
                  </div>
                  <div className="btn_box mb-xl-30">
                    <Link href="/portfolio-details">
                      <a className="thm-btn bg-thm-color-two-light thm-color-two btn-rectangle btn-small">
                        <i className="fal fa-chevron-right font-weight-bold" />
                      </a>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="portfolio_box wow fadeInDown">
                <div className="portfolio_img">
                  <img
                    src="assets/images/portfolio/2.jpg"
                    className="image-fit"
                    alt="img"
                  />
                </div>
                <div className="portfolio_caption">
                  <div className="text_box">
                    <h4 className="title mb-0">
                      <Link href="/portfolio-details">
                        Online Consulting Tutorials
                      </Link>
                    </h4>
                    <p>Business Coach</p>
                  </div>
                  <div className="btn_box mb-xl-30">
                    <Link href="/portfolio-details">
                      <a className="thm-btn bg-thm-color-two-light thm-color-two btn-rectangle btn-small">
                        <i className="fal fa-chevron-right font-weight-bold" />
                      </a>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <FooterContact />
    </Layout>
  );
};

export default Faq;
