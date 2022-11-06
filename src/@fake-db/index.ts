import mock from "./mock";

import "./table";
import "./apps/chat";
import "./pages/faq";
import "./pages/pricing";
import "./pages/knowledge-base";
import "./server-side-menu/vertical";
import "./server-side-menu/horizontal";

mock.onAny().passThrough();
