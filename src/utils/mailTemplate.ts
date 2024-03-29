import { mappedVars } from '../config/environments';

const ActivateAccount = (link: string) => `
<div style="text-align:center;font-family:sans-serif">
<style>
  .button {
    font: bold 11px Arial;
    text-decoration: none;
    background-color: #66BB6A;
    color: #ffffff;
    padding: 15px;
  }
  .paragraph {
    color:#455A64;
    margin-bottom:30px;
  }
  .link {
    margin-top: 40px;
  }
</style>

<h1>${mappedVars.appName}</h1>
  <p class="paragraph">You registered for ${mappedVars.appName} account with this email address. Please click activate account button in order to activate your account, Or use the link below if that doesn't work. </p>
  <a class="button" href="${link}" target="_blank">Activate Account</a>
<br/>
<div class="link">
  <a  href="${link}">${link}</a>
 </div>
</div>  
`;

export default ActivateAccount;
