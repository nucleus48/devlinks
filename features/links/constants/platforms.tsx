import CodepenIcon from "@/components/icons/codepen";
import CodewarsIcon from "@/components/icons/codewars";
import DevtoIcon from "@/components/icons/devto";
import FacebookIcon from "@/components/icons/facebook";
import FreecodecampIcon from "@/components/icons/freecodecamp";
import FrontendMentorIcon from "@/components/icons/frontend-mentor";
import GithubIcon from "@/components/icons/github";
import HashnodeIcon from "@/components/icons/hashnode";
import LinkedinIcon from "@/components/icons/linkedin";
import StackOverflowIcon from "@/components/icons/stack-overflow";
import TwitchIcon from "@/components/icons/twitch";
import TwitterIcon from "@/components/icons/twitter";
import YoutubeIcon from "@/components/icons/youtube";

export const Platforms = [
  {
    platform: "GitHub",
    placeholder: "https://github.com/nucleus48",
    icon: <GithubIcon />,
    regex: /^https?:\/\/(www\.)?github\.com\/[A-Za-z0-9_-]+\/?$/,
  },
  {
    platform: "Frontend Mentor",
    placeholder: "https://www.frontendmentor.io/profile/nucleus48",
    icon: <FrontendMentorIcon />,
    regex:
      /^https?:\/\/(www\.)?frontendmentor\.io\/profile\/[A-Za-z0-9_-]+\/?$/,
  },
  {
    platform: "Twitter",
    placeholder: "https://twitter.com/nucleus48",
    icon: <TwitterIcon />,
    regex: /^https?:\/\/(www\.)?(x|twitter)\.com\/[A-Za-z0-9_]+\/?$/,
  },
  {
    platform: "LinkedIn",
    placeholder: "https://www.linkedin.com/in/nucleus48",
    icon: <LinkedinIcon />,
    regex: /^https?:\/\/(www\.)?linkedin\.com\/in\/[A-Za-z0-9_-]+\/?$/,
  },
  {
    platform: "Youtube",
    placeholder: "https://www.youtube.com/c/nucleus48",
    icon: <YoutubeIcon />,
    regex:
      /^https?:\/\/(www\.)?(youtube\.com\/(c|channel|user)\/|youtu\.be\/)[A-Za-z0-9_-]+\/?$/,
  },
  {
    platform: "Facebook",
    placeholder: "https://www.facebook.com/nucleus48",
    icon: <FacebookIcon />,
    regex: /^https?:\/\/(www\.)?facebook\.com\/[A-Za-z0-9.]+\/?$/,
  },
  {
    platform: "Twitch",
    placeholder: "https://www.twitch.tv/nucleus48",
    icon: <TwitchIcon />,
    regex: /^https?:\/\/(www\.)?twitch\.tv\/[A-Za-z0-9_-]+\/?$/,
  },
  {
    platform: "Dev.to",
    placeholder: "https://dev.to/nucleus48",
    icon: <DevtoIcon />,
    regex: /^https?:\/\/(www\.)?dev\.to\/[A-Za-z0-9_-]+\/?$/,
  },
  {
    platform: "Codewars",
    placeholder: "https://www.codewars.com/users/nucleus48",
    icon: <CodewarsIcon />,
    regex: /^https?:\/\/(www\.)?codewars\.com\/users\/[A-Za-z0-9_-]+\/?$/,
  },
  {
    platform: "Codepen",
    placeholder: "https://codepen.io/nucleus48",
    icon: <CodepenIcon />,
    regex: /^https?:\/\/(www\.)?codepen\.io\/[A-Za-z0-9_-]+\/?$/,
  },
  {
    platform: "freeCodeCamp",
    placeholder: "https://www.freecodecamp.org/nucleus48",
    icon: <FreecodecampIcon />,
    regex: /^https?:\/\/(www\.)?freecodecamp\.org\/[A-Za-z0-9_-]+\/?$/,
  },
  {
    platform: "GitLab",
    placeholder: "https://gitlab.com/nucleus48",
    icon: <GithubIcon />,
    regex: /^https?:\/\/(www\.)?gitlab\.com\/[A-Za-z0-9_-]+\/?$/,
  },
  {
    platform: "Hashnode",
    placeholder: "https://nucleus48.hashnode.dev",
    icon: <HashnodeIcon />,
    regex: /^https?:\/\/(www\.)?[A-Za-z0-9_-]+\.hashnode\.dev\/?$/,
  },
  {
    platform: "Stack Overflow",
    placeholder: "https://stackoverflow.com/users/123456/nucleus48",
    icon: <StackOverflowIcon />,
    regex:
      /^https?:\/\/(www\.)?stackoverflow\.com\/users\/\d+\/[A-Za-z0-9_-]+\/?$/,
  },
];
