import "./css/index.css";
import resume from "./md/resume.md";
import logo from "./svg/logo.svg";

import {Marked} from "@ts-stack/markdown";

document.getElementById("resume").innerHTML = `${logo}\n${Marked.parse(resume)}`;
