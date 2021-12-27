import { Form } from './form/Form';
import { Field, FieldPassword, Submit } from './form/FormType';
import * as fv from './form/validators/FormValidator';

function App() {
  let validator = {
    name: fv.validate().required(true, "Campo Obrigatório!").email('Este email nao é valido!'),
    pass: fv.validate().required(true, "Campo Obrigatório!").password('Senha muito fraca!')
  }

  let handleSubmit = (values) => {
    console.log("Success", values);
  }

  return (
    <div>
      <Form onSubmit={handleSubmit} validator={validator}>
        <Field name="name" id={"email-field"} labelText={"Email: "} />
        <FieldPassword name="pass" id={"password-field"} labelText={"Senha: "} />
        <Submit text={"Enviar"} />
      </Form>
    </div>
  );
}

export default App;