// import React from 'react';
// import {
//   Step,
//   Stepper,
//   StepButton,
//   StepContent,
// } from 'material-ui/Stepper';
// import RaisedButton from 'material-ui/RaisedButton';
// import FlatButton from 'material-ui/FlatButton';
//
// /**
//  * A basic vertical non-linear implementation
//  */
// class VerticalNonLinear extends React.Component {
//
//   state = {
//     stepIndex: 0,
//     href: ''
//   };
//
//   handleNext = () => {
//     const {stepIndex} = this.state;
//     if (stepIndex < 2) {
//       this.setState({stepIndex: stepIndex + 1});
//     }
//   };
//
//   handlePrev = () => {
//     const {stepIndex} = this.state;
//     if (stepIndex > 0) {
//       this.setState({stepIndex: stepIndex - 1});
//     }
//   };
//
//   renderStepActions(step) {
//     return (
//       <div style={{margin: '12px 0'}}>
//         <RaisedButton
//           label="Next"
//           disableTouchRipple={true}
//           disableFocusRipple={true}
//           primary={true}
//           onTouchTap={this.handleNext}
//           style={{marginRight: 12}}
//         />
//         {step > 0 && (
//           <FlatButton
//             label="Back"
//             disableTouchRipple={true}
//             disableFocusRipple={true}
//             onTouchTap={this.handlePrev}
//           />
//         )}
//       </div>
//     );
//   }
//
//   render() {
//     const {stepIndex} = this.state;
//
//     return (
//       <div style={{maxWidth: 380, maxHeight: 400, margin: 'auto'}}>
//
//
//
//         <Stepper
//           activeStep={stepIndex}
//           linear={false}
//           orientation="vertical"
//         >
//           <Step>
//             <StepButton onTouchTap={() => this.setState({stepIndex: 0})}>
//               Клонирование веб приложения quick-order
//             </StepButton>
//             <StepContent>
//               <p>
//                 Для того чтобы ваше веб приложение quick-order имело собственный адрес в интернет, вам необходимо клонировать базовое приложение
//                 Вот инструкция как это сделать
//                 После того как вы клонировали приложение введите его адрес в этом поле
//               </p>
//
//               <input
//                 type='text'
//                 onChange={
//                   (e) => {
//                     // console.log('e', e.target.value.trim());
//                     this.setState({ href: e.target.value.trim() });
//                   }
//                 }
//               />
//
//               {this.renderStepActions(0)}
//             </StepContent>
//           </Step>
//           <Step>
//             <StepButton onTouchTap={() => this.setState({stepIndex: 1})}>
//               Создание firebase приложения
//             </StepButton>
//             <StepContent>
//               <p>
//                 Данные веб приложения quick-order хрантся в облачной базе данных firebase
//                 Создайте свой свой собственный экземпляр базы данных firebase для того, чтобы ваше приложение
//                 quick-order работало с Вашими данными
//                 Инструкция по созданию базы firebase
//                 Укажите параметры apiKey и databaseUrl вашей только что созданной базы firebase
//                 <input type="text" />
//                 <input type="text" />
//               </p>
//               {this.renderStepActions(1)}
//             </StepContent>
//           </Step>
//           <Step>
//             <StepButton onTouchTap={() => this.setState({stepIndex: 2})}>
//               Создайте администратора Вашего приложения quick-order
//             </StepButton>
//             <StepContent>
//               <p>
//               <input type="text" />
//               <input type="text" />
//               </p>
//               {this.renderStepActions(2)}
//             </StepContent>
//           </Step>
//           <Step>
//             <StepButton onTouchTap={() => this.setState({stepIndex: 3})}>
//               Создание нового пользователя
//             </StepButton>
//             <StepContent>
//               <p>
//                 Вы можете прямо сейчас создать нового пользователя приложения
//               </p>
//               {this.renderStepActions(3)}
//             </StepContent>
//           </Step>
//           <Step>
//             <StepButton onTouchTap={() => this.setState({stepIndex: 3})}>
//               Настройки бизнес логики и заполнение данными
//             </StepButton>
//             <StepContent>
//               <p>
//                 Вы можете прямо сейчас выполнить минимальную настройку вашего приложения
//                 Рекомендуется выполнить этот шаг, так как вы сразу же увидите какие данные потребуется отправлять в firebase,
//                 чтобы ваше веб приложение quick-order работало корректно при заданных настройках бизнес логики
//               </p>
//               <button>Выполнить настройку</button>
//               <button>Нет, я подумаю об этом завтра</button>
//               {this.renderStepActions(3)}
//             </StepContent>
//           </Step>
//         </Stepper>
//       </div>
//     );
//   }
// }
//
// export default VerticalNonLinear;

import React from 'react';
import {
  Step,
  Stepper,
  StepLabel,
  StepContent,
} from 'material-ui/Stepper';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';

/**
 * Vertical steppers are designed for narrow screen sizes. They are ideal for mobile.
 *
 * To use the vertical stepper with the contained content as seen in spec examples,
 * you must use the `<StepContent>` component inside the `<Step>`.
 *
 * <small>(The vertical stepper can also be used without `<StepContent>` to display a basic stepper.)</small>
 */
class VerticalLinearStepper extends React.Component {

  state = {
    finished: false,
    stepIndex: 0,
  };

  handleNext = () => {
    const {stepIndex} = this.state;
    this.setState({
      stepIndex: stepIndex + 1,
      finished: stepIndex >= 2,
    });
  };

  handlePrev = () => {
    const {stepIndex} = this.state;
    if (stepIndex > 0) {
      this.setState({stepIndex: stepIndex - 1});
    }
  };

  renderStepActions(step) {
    const {stepIndex} = this.state;

    return (
      <div style={{margin: '12px 0'}}>
        <RaisedButton
          label={stepIndex === 2 ? 'Finish' : 'Next'}
          disableTouchRipple={true}
          disableFocusRipple={true}
          primary={true}
          onTouchTap={this.handleNext}
          style={{marginRight: 12}}
        />
        {step > 0 && (
          <FlatButton
            label="Back"
            disabled={stepIndex === 0}
            disableTouchRipple={true}
            disableFocusRipple={true}
            onTouchTap={this.handlePrev}
          />
        )}
      </div>
    );
  }

  render() {
    const {finished, stepIndex} = this.state;

    return (
      <div style={{maxWidth: 1380, maxHeight: 400, margin: 'auto'}}>
        <Stepper activeStep={stepIndex} orientation="vertical">
          <Step>
            <StepLabel>Select campaign settings</StepLabel>
            <StepContent>
              <p>
                For each ad campaign that you create, you can control how much
                you're willing to spend on clicks and conversions, which networks
                and geographical locations you want your ads to show on, and more.
              </p>
              {this.renderStepActions(0)}
            </StepContent>
          </Step>
          <Step>
            <StepLabel>Create an ad group</StepLabel>
            <StepContent>
              <p>An ad group contains one or more ads which target a shared set of keywords.</p>
              {this.renderStepActions(1)}
            </StepContent>
          </Step>
          <Step>
            <StepLabel>Create an ad</StepLabel>
            <StepContent>
              <p>
                Try out different ad text to see what brings in the most customers,
                and learn how to enhance your ads using features like ad extensions.
                If you run into any problems with your ads, find out how to tell if
                they're running and how to resolve approval issues.
              </p>
              {this.renderStepActions(2)}
            </StepContent>
          </Step>
        </Stepper>
        {finished && (
          <p style={{margin: '20px 0', textAlign: 'center'}}>
            <a
              href="#"
              onClick={(event) => {
                event.preventDefault();
                this.setState({stepIndex: 0, finished: false});
              }}
            >
              Click here
            </a> to reset the example.
          </p>
        )}
      </div>
    );
  }
}

export default VerticalLinearStepper;
