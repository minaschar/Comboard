import { createApp, h } from "vue";

import router from "./router.js";
import store from "./store/index.js";

// Import components
import App from "./App.vue";
import BaseSection from "./components/basic-components/BaseSection.vue";
import BaseCard from "./components/basic-components/BaseCard.vue";
import BaseSpinner from "./components/basic-components/BaseSpinner";
import LoadingSpinner from "./components/basic-components/LoadingSpinner";
import BaseDialog from "./components/basic-components/BaseDialog.vue";
import BaseButton from "./components/basic-components/BaseButton.vue";
import BaseMessage from "./components/basic-components/BaseMessage.vue";

import { setupCalendar, Calendar, DatePicker } from "v-calendar";
import "v-calendar/style.css";

/* import the fontawesome core */
import { library } from "@fortawesome/fontawesome-svg-core";

/* import font awesome icon component */
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

import {
  faPeopleGroup,
  faCalendarDays,
  faListCheck,
  faDiagramProject,
  faHandshakeSimple,
  faBoxOpen,
  faSun,
  faMoon,
  faBars,
  faSquareCaretDown,
  faBell,
  faInbox,
  faVideo,
  faEllipsisVertical,
  faUserPlus,
  faAnglesRight,
  faUser,
  faGear,
  faCircleQuestion,
  faComments,
  faCircleChevronLeft,
  faUserCheck,
  faHeart,
  faBook,
  faCloud,
  faCloudArrowUp,
  faRightFromBracket,
  faPhone,
  faEnvelope,
  faUserMinus,
  faAngleDown,
  faPaperPlane,
  faEarthEurope,
  faLock,
  faPen,
  faKey,
  faFileSignature,
  faLocationDot,
  faGlobe,
  faEllipsis,
  faTrashCan,
  faArrowUpAZ,
  faArrowDownAZ,
} from "@fortawesome/free-solid-svg-icons";

import {
  faComment,
  faFilePdf,
  faFileWord,
  faFileExcel,
  faImage,
  faFileImage,
  faFile,
  faClipboard,
  faFilePowerpoint,
  faFileLines,
  faFileCode,
  faFileZipper,
  faFileAudio,
  faFileVideo,
  faSquarePlus,
} from "@fortawesome/free-regular-svg-icons";

import { faGoogle, faApple, faLinkedin } from "@fortawesome/free-brands-svg-icons";

/* add icons to the library */
library.add(
  faArrowUpAZ,
  faArrowDownAZ,
  faSquarePlus,
  faFileVideo,
  faFileAudio,
  faFileZipper,
  faFileCode,
  faFileLines,
  faPeopleGroup,
  faCalendarDays,
  faListCheck,
  faDiagramProject,
  faHandshakeSimple,
  faBoxOpen,
  faSun,
  faMoon,
  faBars,
  faSquareCaretDown,
  faBell,
  faInbox,
  faVideo,
  faEllipsisVertical,
  faHeart,
  faComment,
  faFile,
  faFilePdf,
  faFileWord,
  faFileExcel,
  faFileImage,
  faUserPlus,
  faAnglesRight,
  faGoogle,
  faApple,
  faLinkedin,
  faUser,
  faGear,
  faCircleQuestion,
  faComments,
  faCircleChevronLeft,
  faUserCheck,
  faImage,
  faBook,
  faCloud,
  faCloudArrowUp,
  faRightFromBracket,
  faPhone,
  faEnvelope,
  faUserMinus,
  faAngleDown,
  faPaperPlane,
  faEarthEurope,
  faLock,
  faPen,
  faKey,
  faFileSignature,
  faLocationDot,
  faGlobe,
  faClipboard,
  faEllipsis,
  faTrashCan,
  faFilePowerpoint
);

const app = createApp(h(App));

// Custom directives
app.directive("focus", {
  mounted(el) {
    el.focus();
  },
});

// Use routers module
app.use(router);
// Use store module
app.use(store);

app.use({ render: h(App) });

// Use calendar plugin defaults (optional)
app.use(setupCalendar, {});

// Use the calendar components
app.component("VCalendar", Calendar);
app.component("VDatePicker", DatePicker);

// Register global components
app.component("base-section", BaseSection);
app.component("base-card", BaseCard);
app.component("base-dialog", BaseDialog);
app.component("base-spinner", BaseSpinner);
app.component("loading-spinner", LoadingSpinner);
app.component("base-button", BaseButton);
app.component("base-message", BaseMessage);
app.component("font-awesome-icon", FontAwesomeIcon);

app.mount("#app");
