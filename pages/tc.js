import { Accordion, Nav, Tab } from "react-bootstrap";
import PageTitleBanner from "../src/components/PageTitleBanner";
import Layout from "../src/layout/Layout";
import React from "react";
import Footer from "../src/layout/Footer";

import circle_3 from "../public/assets/images/elements/circle3.png";
import Image from "next/image";

const Faq = () => {
  return (
    <Layout language={"en"}>
      <PageTitleBanner pageName="Terms and Conditions" />
      <div className="section-padding faqs_elements">
        <div className="container relative z-1">
          <div className="row justify-content-center">
            <div className="col-xl-9 col-lg-11">
              <Tab.Container defaultActiveKey="general">
                <Nav className="nav nav-tabs style_3 wow fadeInUp">
                  <Nav.Item className="nav-item">
                    <Nav.Link href="#" eventKey="general" className="nav-link" data-toggle="tab">
                      Interpretation and Definitions
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item className="nav-item">
                    <Nav.Link href="#" eventKey="allcoach" className="nav-link" data-toggle="tab">
                      Copyright Policy
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item className="nav-item"></Nav.Item>
                </Nav>
                <Tab.Content className="tab-content wow fadeInDown">
                  <Tab.Pane className="tab-pane fade show" eventKey="general">
                    <Accordion
                      className="accordion accordion-style style_2 mb-xl-30"
                      id="tutorialsaccordion"
                      defaultActiveKey={"TutorialsItemOne"}
                    >
                      <div className="card">
                        <div className="card-header">
                          <Accordion.Toggle
                            as="button"
                            className="btn btn-link"
                            data-target={"TutorialsItemOne"}
                            eventKey={"TutorialsItemOne"}
                          >
                            Interpretation
                          </Accordion.Toggle>
                        </div>
                        <Accordion.Collapse
                          id={"TutorialsItemOne"}
                          eventKey={"TutorialsItemOne"}
                          data-parent="#tutorialsaccordion"
                        >
                          <div className="card-body">
                            The words of which the initial letteris capitalized have meanings defined under the
                            following conditions. The following definitions shall have the same meaning regardless of
                            whether they appear in singular or in plural.
                          </div>
                        </Accordion.Collapse>
                      </div>
                      <div className="card">
                        <div className="card-header">
                          <Accordion.Toggle
                            as="button"
                            className="btn btn-link"
                            data-target="#TutorialsItemTwo"
                            eventKey={"TutorialsItemTwo"}
                          >
                            Definitions
                          </Accordion.Toggle>
                        </div>
                        <Accordion.Collapse
                          id={"TutorialsItemTwo"}
                          eventKey={"TutorialsItemTwo"}
                          data-parent="#tutorialsaccordion"
                        >
                          <div className="card-body">
                            • &quot;Affiliate&quot; means an entity that controls, is controlled by or is under common
                            control with a party, where &quot;control&quot; means ownership of 50% or more of the
                            shares, equity interest or other securities entitled to vote for election of directors or
                            other managing authority.
                            <br></br>• &quot;Account&quot; means a unique account created for You to access our Service
                            or parts of our Service.<br></br>• &quot;Company&#39; (referred to as either &quot;the
                            Company&quot;,&quot;We&quot;, &quot;Us&quot; or &quot;Our&quot; in this Agreement) refers to
                            [COMPANY_ INFORMATION].
                            <br></br>• &quot;Country&#39;refers to Bulgaria.
                            <br></br>• &quot;Content&#39;refers to content such as text, images, or other information
                            that can be posted,uploaded, linked to or otherwise made available by You,regardless of the
                            form of that content.<br></br>• &quot;Device&quot; means any device that can access the
                            Service such as a computer,a cell phone or a digital tablet.<br></br>• &quot;Feedback&quot;
                            means feedback, innovations or suggestions sent by You regarding the attributes, performance
                            or features of our Service.<br></br>• &quot;Service&quot; refers to the Website.
                            <br></br>• &quot;Terms and Conditions·(also referred as &#39;Terms&quot;) mean these Terms
                            and Conditions that form the entire agreement between You and the Company regarding the use
                            of the Service.<br></br>• &quot;Third-party Social Media Service&quot; means any services or
                            content (including data,information, products or services) provided by a third-party that
                            may be displayed,included or made available by the Service.<br></br>• &quot;Website&quot;
                            refers to [WEBSITE_NAME]. accessible from [WEBSITE_URL]
                            <br></br>• &quot;You&quot; means the individual accessing or using the Service, or the
                            company, or other legal entity on behalf of which such individualis accessing or using the
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
                            eventKey={"TutorialsItemThree"}
                          >
                            Acknowledgment
                          </Accordion.Toggle>
                        </div>
                        <Accordion.Collapse
                          id={"TutorialsItemThree"}
                          eventKey={"TutorialsItemThree"}
                          data-parent="#tutorialsaccordion"
                        >
                          <div className="card-body">
                            These are the Terms and Conditions governing the use of this Service and the agreement that
                            operates between You and the Company. These Terms and Conditions set out the rights and
                            obligations of all users regarding the use of the Service. Your access to and use of the
                            Service is conditioned on Your acceptance of and compliance with these Terms and Conditions.
                            These Terms and Conditions apply to all visitors, users and others who access or use the
                            Service. By accessing or using the Service You agree to be bound by these Terms and
                            Conditions. If You disagree with any part of these Terms and Conditions then You may not
                            access the Service . You represent that you are over the age of 18. The Company does not
                            permit those under 18 to use the Service. Your access to and use of the Service is also
                            conditioned on Your acceptance of and compliance with the Privacy Policy of the Company. Our
                            Privacy Policy describes Our policies and procedures on the collection, use and disclosure
                            of Your personal information when You use the Application or the Website and tells You about
                            Your privacy rights and how the law protects You. Please read Our Privacy Policy carefully
                            before using Our Service.
                          </div>
                        </Accordion.Collapse>
                      </div>
                      <div className="card">
                        <div className="card-header">
                          <Accordion.Toggle
                            as="button"
                            className="btn btn-link"
                            data-target="#TutorialsItemFour"
                            eventKey={"TutorialsItemFour"}
                          >
                            User Accounts
                          </Accordion.Toggle>
                        </div>
                        <Accordion.Collapse
                          id={"TutorialsItemFour"}
                          eventKey={"TutorialsItemFour"}
                          data-parent="#tutorialsaccordion"
                        >
                          <div className="card-body">
                            When You create an account with Us, You must provide Us information that is
                            accurate,complete, and current at all times. Failure to do so constitutes a breach of the
                            Terms, which may result in immediate termination of Your account on Our Service. You are
                            responsible for safeguarding the password that You use to access the Service and for any
                            activities or actions under Your password,whether Your password is with Our Service or a
                            Third-Party Social Media Service. You agree not to disclose Your password to any third
                            party. You must notify Us immediately upon becoming aware of any breach of security or
                            unauthorized use of Your account. You may not use as a username the name of another person
                            or entity or that is not lawfully available for use,a name or trademark that is subject to
                            any rights of another person or entity other than You without appropriate authorization, or
                            a name that is otherwise offensive,vulgar or obscene.
                          </div>
                        </Accordion.Collapse>
                      </div>
                      <div className="card">
                        <div className="card-header">
                          <Accordion.Toggle
                            as="button"
                            className="btn btn-link"
                            data-target="#TutorialsItemFive"
                            eventKey={"TutorialsItemFive"}
                          >
                            Content
                          </Accordion.Toggle>
                        </div>
                        <Accordion.Collapse
                          id={"TutorialsItemFive"}
                          eventKey={"TutorialsItemFive"}
                          data-parent="#tutorialsaccordion"
                        >
                          <div className="card-body">
                            <h5>Your Right to Post Content</h5>
                            <br></br>
                            Our Service allows You to post Content. You are responsible for the Content that You post to
                            the Service, including its legality, reliability, and appropriateness. By posting Content to
                            the Service,You grant Us the right and license to use, modify,publicly perform, publicly
                            display,reproduce,and distribute such Content on and through the Service. You retain any and
                            all of Your rights to any Content You submit,post or display on or through the Service and
                            You are responsible for protecting those rights. You agree that this license includes the
                            right for Us to make Your Content available to other users of the Service, who may also use
                            Your Content subject to these Terms. You represent and warrant that: (i) the Content is
                            Yours (You own it) or You have the right to use it and grant Us the rights and license as
                            provided in these Terms, and (ii) the posting of Your Content on or through the Service does
                            not violate the privacy rights,publicity rights,copyrights,contract rights or any other
                            rights of any person.
                          </div>
                        </Accordion.Collapse>
                      </div>
                      <div className="card">
                        <div className="card-header">
                          <Accordion.Toggle
                            as="button"
                            className="btn btn-link"
                            data-target="#TutorialsItemSix"
                            eventKey={"TutorialsItemSix"}
                          >
                            Content Restrictions
                          </Accordion.Toggle>
                        </div>
                        <Accordion.Collapse
                          id={"TutorialsItemSix"}
                          eventKey={"TutorialsItemSix"}
                          data-parent="#tutorialsaccordion"
                        >
                          <div className="card-body">
                            The Company is not responsible for the content of the Service&#39;s users. You expressly
                            understand and agree that You are solely responsible for the Content and for all activity
                            that occurs under your account, whether done so by You or any third person using Your
                            account. You may not transmit any Content that is unlawful, offensive, upsetting, intended
                            to disgust,threatening, libelous, defamatory, obscene or otherwise objectionable. Examples
                            of such objectionable Content include, but are not limited to,the following:
                            <br></br>
                            <br></br>• Unlawful or promoting unlawful activity.
                            <br></br>• Defamatory,discriminatory, or mean-spirited content, including references or
                            commentary about religion, race, sexualorientation, gender, national/ethnic origin,or other
                            targeted groups.<br></br>• Spam, machine - or randomly - generated, constituting
                            unauthorized or unsolicited advertising, chain letters, any other form of unauthorized
                            solicitation, or any form of lottery or gambling.
                            <br></br>• Containing or installing any viruses,worms , malware, trojan horses, or other
                            content that is designed or intended to disrupt, damage, or limit the functioning of any
                            software, hardware or telecommunications equipment or to damage or obtain unauthorized
                            access to any data or other information of a third person.<br></br>• Infringing on any
                            proprietary rights of any party, including patent, trademark , trade secret,copyright, right
                            of publicity or other rights.<br></br>• Impersonating any person or entity including the
                            Company and its employees or representatives.<br></br>• Violating the privacy of any third
                            person.<br></br>• False information and features .<br></br>
                            <br></br>The Company reserves the right, but not the obligation,to, in its sole discretion,
                            determine whether or not any Content is appropriate and complies with Terms,refuse or remove
                            this Content. The Company further reserves the right to make formatting and edits and change
                            the manner of any Content. The Company can also limit or revoke the use of the Service if
                            You post such objectionable Content. As the Company cannot control all content posted by
                            users and/or third parties on the Service,you agree to use the Service at your own risk. You
                            understand that by using the Service You may be exposed to content that You may find
                            offensive,indecent, incorrect or obje ctionable, and You agree that under no circumstances
                            will the Company be liable in any way for any content, including any errors or omissions in
                            any content, or any loss or damage of any kind incurred as a result of your use of any
                            content.
                          </div>
                        </Accordion.Collapse>
                      </div>
                      <div className="card">
                        <div className="card-header">
                          <Accordion.Toggle
                            as="button"
                            className="btn btn-link"
                            data-target="#TutorialsItemSeven"
                            eventKey={"TutorialsItemSeven"}
                          >
                            Content Backups
                          </Accordion.Toggle>
                        </div>
                        <Accordion.Collapse
                          id={"TutorialsItemSeven"}
                          eventKey={"TutorialsItemSeven"}
                          data-parent="#tutorialsaccordion"
                        >
                          <div className="card-body">
                            Although regular backups of Content are performed, the Company does not guarantee there will
                            be no loss or corruption of data. Corrupt or invalid backup points may be caused by, wit
                            houtlimitation,Content that is corrupted prior to being backed up or that changes during the
                            time a backup is performed. The Company will provide support and attempt to troubleshoot any
                            known or discovered issues that may affect the backups of Content. But You acknowledge that
                            the Company has no liability related to the integrity of Content or the failure to
                            successfully restore Content to a usable state . You agree to maintain a complete and
                            accurate copy of any Content in a location independent of the Service.
                          </div>
                        </Accordion.Collapse>
                      </div>
                    </Accordion>
                  </Tab.Pane>
                  <Tab.Pane className="tab-pane fade" eventKey="allcoach">
                    <Accordion
                      className="accordion accordion-style style_2 mb-xl-30"
                      id="tutorialsaccordion"
                      defaultActiveKey={"TutorialsItemOne"}
                    >
                      <div className="card">
                        <div className="card-header">
                          <Accordion.Toggle
                            as="button"
                            className="btn btn-link"
                            data-target={"TutorialsItemOne"}
                            eventKey={"TutorialsItemOne"}
                          >
                            Intellectual Property Infringement
                          </Accordion.Toggle>
                        </div>
                        <Accordion.Collapse
                          id={"TutorialsItemOne"}
                          eventKey={"TutorialsItemOne"}
                          data-parent="#tutorialsaccordion"
                        >
                          <div className="card-body">
                            We respect the intellectual property rights of others.It is Our policy to respond to any
                            claim that Content posted on the Service infringes a copyright or other intellectual
                            property infringement of any person. If You are a copyright owner, or authorized on behalf
                            of one, and You believe that the copyrighted work has been copied in a way that constitutes
                            copyright infringement that is taking place through the Service, You must submit Your not ce
                            in writing to the attention of our copyright agent via email
                            ([COPYRIGHT_AGENT_CONTACT_EMAIL]) and includein You r notice a detailed description of the
                            alleged infringement. You may be held accountable for damages (including costs and
                            attorneys&#39; fees) for misrepresenting that any Content is infringing Your copyright.
                          </div>
                        </Accordion.Collapse>
                      </div>
                      <div className="card">
                        <div className="card-header">
                          <Accordion.Toggle
                            as="button"
                            className="btn btn-link"
                            data-target="#TutorialsItemTwo"
                            eventKey={"TutorialsItemTwo"}
                          >
                            DMCA Notice and DMCA Procedure for Copyright Infringement Claims
                          </Accordion.Toggle>
                        </div>
                        <Accordion.Collapse
                          id={"TutorialsItemTwo"}
                          eventKey={"TutorialsItemTwo"}
                          data-parent="#tutorialsaccordion"
                        >
                          <div className="card-body">
                            You may submit a notificat ion pursuant to the Digital Millennium Copyright Act (DMCA) by
                            providing our Copyright Agent with the following information in writing (see 17 U.S.C
                            512(c)(3) for further detail):<br></br>
                            <br></br>• An electronic or physical signature of the person authorized to act on behalf of
                            the owner of the copyright&#39;s interest.
                            <br></br>• A description of the copyrighted work that You claim has been infringed,including
                            the URL (i.e., web page address) of the location where the copyrighted work exists or a copy
                            of the copyrighted work .<br></br>• Identification of the URL or other specificlocation on
                            the Service where the material that You claim is infringing is located.<br></br>• Your
                            address , telephone number, and email address.
                            <br></br>• A statement by You that You have a good faith belief that the disputed use is not
                            authorized by the copyright owner,its agent, or the law.
                            <br></br>• A statement by You,made under penalty of perj ury, that the above information in
                            Your notice is accurate and that You are the copyright owner or authorized to act on the
                            copyright owner&#39;s behalf.<br></br>
                            <br></br>You can contact our copyright agent via email ([COPYR IGHT_AGENT_CONTACT_EMAIL]).
                            Upon receipt of a notification,the Company will take whateve r action, in its sole
                            discretion,it deems appropriate, including removal of the challenged content from the
                            Service.
                          </div>
                        </Accordion.Collapse>
                      </div>
                      <div className="card">
                        <div className="card-header">
                          <Accordion.Toggle
                            as="button"
                            className="btn btn-link"
                            data-target="#TutorialsItemThree"
                            eventKey={"TutorialsItemThree"}
                          >
                            Intellectual Property
                          </Accordion.Toggle>
                        </div>
                        <Accordion.Collapse
                          id={"TutorialsItemThree"}
                          eventKey={"TutorialsItemThree"}
                          data-parent="#tutorialsaccordion"
                        >
                          <div className="card-body">
                            The Service and its original content (excluding Content provided by You or other users),
                            features and functionality are and wi ll remain the exclusive property of the Company and
                            its licensors. The Service is protected by copyright,trademark, and other laws of both the
                            Country and foreign countries. Our trademarks and trade dress may not be used in connection
                            with any product or service without the prior written consent of the Company.
                          </div>
                        </Accordion.Collapse>
                      </div>
                      <div className="card">
                        <div className="card-header">
                          <Accordion.Toggle
                            as="button"
                            className="btn btn-link"
                            data-target="#TutorialsItemFour"
                            eventKey={"TutorialsItemFour"}
                          >
                            Your Feedback to Us
                          </Accordion.Toggle>
                        </div>
                        <Accordion.Collapse
                          id={"TutorialsItemFour"}
                          eventKey={"TutorialsItemFour"}
                          data-parent="#tutorialsaccordion"
                        >
                          <div className="card-body">
                            WYou assign all rights, title and interest in any Feedback You provide the Company.If for
                            any reason such assignment is ineffective, You agree to grant the Company a non-exclusive,
                            perpetual, irrevocable, royalty free, worldwide right and license to use,
                            reproduce,disclose,sub-license, distribute, modify and exploit such Feedback without
                            restriction.
                          </div>
                        </Accordion.Collapse>
                      </div>
                      <div className="card">
                        <div className="card-header">
                          <Accordion.Toggle
                            as="button"
                            className="btn btn-link"
                            data-target="#TutorialsItemFive"
                            eventKey={"TutorialsItemFive"}
                          >
                            Links to Other Websites
                          </Accordion.Toggle>
                        </div>
                        <Accordion.Collapse
                          id={"TutorialsItemFive"}
                          eventKey={"TutorialsItemFive"}
                          data-parent="#tutorialsaccordion"
                        >
                          <div className="card-body">
                            Our Service may contain links to third-party web sites or services that are not owned or
                            controlled by the Company. The Company has no control over, and assumes no responsibility
                            for,the content,privacy policies, or practices of any third party web sites or services .
                            You further acknowledge and agree that the Company shall not be responsible or
                            liable,directly or indirectly, for any damage or loss caused or alleged to be caused by or
                            in connection with the use of or relance on any such content, goods or services available on
                            or through any such web sites or services. We strongly advise You to read the ter ms and
                            conditions and privacy policies of any third-party web sites or services that You visit.
                          </div>
                        </Accordion.Collapse>
                      </div>
                      <div className="card">
                        <div className="card-header">
                          <Accordion.Toggle
                            as="button"
                            className="btn btn-link"
                            data-target="#TutorialsItemSix"
                            eventKey={"TutorialsItemSix"}
                          >
                            Term ination
                          </Accordion.Toggle>
                        </div>
                        <Accordion.Collapse
                          id={"TutorialsItemSix"}
                          eventKey={"TutorialsItemSix"}
                          data-parent="#tutorialsaccordion"
                        >
                          <div className="card-body">
                            We may terminate or suspend Your Account immediately,wit hout prior notice or liability, for
                            any reason whatsoever,including without limitation if You breach these Terms and Conditions.
                            Upon termination,Your right to use the Service will cease immediately. If You wish to
                            terminate Your Account, You may simply discontinue using the Service.
                          </div>
                        </Accordion.Collapse>
                      </div>
                      <div className="card">
                        <div className="card-header">
                          <Accordion.Toggle
                            as="button"
                            className="btn btn-link"
                            data-target="#TutorialsItemSeven"
                            eventKey={"TutorialsItemSeven"}
                          >
                            Limitation of Liability
                          </Accordion.Toggle>
                        </div>
                        <Accordion.Collapse
                          id={"TutorialsItemSeven"}
                          eventKey={"TutorialsItemSeven"}
                          data-parent="#tutorialsaccordion"
                        >
                          <div className="card-body">
                            Notwithstanding any damages that You might incur,the entire liability of the Company and any
                            of its suppliers under any provision of this Terms and Your exclusive remedy for all of the
                            foregoing shall be limited to the amount actually paid by You through the Service or 100 USO
                            if You haven&#39;t purchased anything through the Service. To the maximum extent permitted
                            by appl cablelaw,in no event shall the Company orits suppliers be liable for any special,
                            incidental,indirect, or consequential damages whatsoever including,but not limited to,
                            damages for loss of profits, loss of data or other information, for business
                            interruption,for personalinjury, loss of privacy arising out of or in any way related to the
                            use of or inability to use the Service, third-party software and/or third-party hardware
                            used with the Service,or otherwise in connection with any provision of.
                          </div>
                        </Accordion.Collapse>
                      </div>
                    </Accordion>
                  </Tab.Pane>
                </Tab.Content>
              </Tab.Container>
            </div>
          </div>
          <Image src={circle_3} alt="element" className="element_1 zoom-fade" />
          <Image src={circle_3} alt="element" className="element_2 zoom-fade" />
          <Image src={circle_3} alt="element" className="element_3 rotate_elem" />
          <Image src={circle_3} alt="element" className="element_4 rotate_elem" />
          <Image src={circle_3} alt="element" className="element_5 rotate_elem" />
        </div>
      </div>
      {/* Faqs End */}
      <Footer />
    </Layout>
  );
};

export default Faq;
