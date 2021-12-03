import React from "react";
import Title from "../Atoms/Title";

import "./FormTemplate.scss";

interface Props {
  title: string;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

/**
 * Wrapper component with a title
 * for forms with fixed width.
 *
 * @return {*}  {JSX.Element}
 */
const FormTemplate: React.FC<Props> = (props): JSX.Element => {
  return (
    <div className="form-template">
      <Title className="form-template__title">{props.title}</Title>
      <form onSubmit={props.onSubmit} className="form-template__form">
        {props.children}
      </form>
    </div>
  );
};

export default FormTemplate;
