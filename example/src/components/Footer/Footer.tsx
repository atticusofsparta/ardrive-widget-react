import {
  DiscordLogoIcon,
  GitHubLogoIcon,
  TwitterLogoIcon,
} from '@radix-ui/react-icons';

function Footer() {
  return (
    <div className="footer dark">
      <div className="footer-links dark">
        <a href="https://discord.com/your_discord_link">
          <DiscordLogoIcon /> Discord
        </a>
        <a href="https://t.me/your_telegram_link">
          <GitHubLogoIcon /> Github
        </a>
        <a href="https://twitter.com/your_twitter_handle">
          <TwitterLogoIcon /> Twitter
        </a>
        <a href="https://yourwebsite.com/terms-and-conditions">
          Terms and Conditions
        </a>
      </div>
    </div>
  );
}

export default Footer;
