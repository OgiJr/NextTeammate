import React from "react";
import { cdnSubpath } from "../../../lib/cdn";

const WorkTeam = ({ users }) => {
  return (
    <section className="section-padding bg-thm-color-two-gradient z-1 team_main_wrap pb-extra">
      <img src="assets/images/elements/element_1.png" className="element_1" alt="Element" />
      <img src="assets/images/elements/element_2.png" className="element_2" alt="Element" />
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="section-title wow fadeInDown">
              <p className="subtitle">
                <i className="fal fa-book" />
                Нашите професионалисти
              </p>
              <h3 className="title">Запознайте се с нашия професионален екип</h3>
            </div>
          </div>
        </div>
        <div className="row">
          {users.map((u) => (
            <div className="col-lg col-md-6" key={u.email}>
              <div className="team_block wow fadeInUp" data-wow-delay=".3s">
                <div className="team_img">
                  <img
                    src={u.picture ? `${cdnSubpath()}${u.picture}` : "/assets/images/no-user.png"}
                    alt="img"
                    className="image-fit"
                  />
                  <a className="thm-btn bg-thm-color-two thm-color-two-shadow btn-circle link">
                    <i className="fal fa-plus" />
                  </a>
                </div>
                <h6 className="mb-1">
                  <a>{`${u.first_name} ${u.last_name}`}</a>
                </h6>
                <p className="thm-color-two mb-0 font-weight-bold">{u.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WorkTeam;
