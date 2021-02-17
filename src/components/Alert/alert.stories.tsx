import Alert from "./alert";
import {storiesOf} from "@storybook/react";


const defaultAlert = () => (<Alert closable message="这是一个默认提示"/>)

storiesOf('Alert Component', module).add('default Component', defaultAlert)