import { Form } from './form/Form';
import { Field, FieldPassword, Submit } from './form/FormType';
import * as fv from './form/validators/FormValidator';

function App() {
  let validator = {
    name: fv.validate().required(true, "Campo Obrigatório!").email('Email not valid'),
    pass: fv.validate().required(true, "Campo ob")
  }

  let handleSubmit = (values) => {
    console.log("Success", values);
  }

  return (
    <div>
      <Form onSubmit={handleSubmit} validator={validator}>
        <Field name="name" id={"meuId"} labelText={"Nosso Nome:"} />
        <FieldPassword name="pass" id={"meu"} labelText={"Sua Senha:"} />
        <Submit text={"Enviar"} />
      </Form>
    </div>
  );
}

export default App;