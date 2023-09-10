import {
  ArrowRightIcon,
  CodeSandboxLogoIcon,
  GitHubLogoIcon,
} from '@radix-ui/react-icons';
import * as Popover from '@radix-ui/react-popover';
import { Button, Card, Section, Text } from '@radix-ui/themes';
import { Link } from 'react-router-dom';

import Connect from '../buttons/Connect';
import Search from '../inputs/Search';

function DeveloperPopover() {
  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <Button
          variant="ghost"
          className="link dark"
          style={{ margin: 'auto' }}
        >
          Developers
        </Button>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content className="flex flex-column card dark">
          <Link className="link" to="/documentation">
            Documentation
          </Link>

          <Link className="link" to="http://github.com/">
            <GitHubLogoIcon /> Github
          </Link>

          <Popover.Arrow />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}

function SettingsPopover() {
  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <Button
          variant="ghost"
          className="link dark"
          style={{ margin: 'auto' }}
        >
          Settings
        </Button>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content className="flex flex-column card dark">
          <a href="#">
            <Text as="div" color="grass" size="2" weight="bold">
              Settings
            </Text>
            <Text as="div" color="gray" size="2">
              Configure app settings
            </Text>
          </a>

          <Popover.Arrow />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}

function ForumPopover() {
  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <Button
          variant="ghost"
          className="link dark"
          style={{ margin: 'auto' }}
        >
          Forum
        </Button>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content className="flex flex-column card dark">
          <Link className="link" to="/forum">
            Forums <ArrowRightIcon />
          </Link>
          <Card>
            <Text>Notifications</Text>
          </Card>

          <Popover.Arrow />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}

function IDMPopover() {
  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <Button
          variant="ghost"
          className="link dark"
          style={{ margin: 'auto' }}
        >
          IDM
        </Button>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content className="flex flex-column card dark">
          <Link className="link" to="/forum">
            Integrated Data Messages <ArrowRightIcon />
          </Link>
          <Card>
            <Text>Notifications</Text>
          </Card>

          <Popover.Arrow />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}

function Navbar() {
  return (
    <div className="navbar">
      <Link to="/" className="link">
        <div
          className="flex flex-row link align-center"
          style={{
            gap: '25px',
          }}
        >
          <CodeSandboxLogoIcon width={30} height={30} />
          App logo
        </div>
      </Link>
      <Search />
      <div
        className="flex flex-row justify-center aling-center"
        style={{ gap: '15px' }}
      >
        <IDMPopover />
        <ForumPopover />
        <SettingsPopover />
        <DeveloperPopover />
        <Connect />
      </div>
    </div>
  );
}

export default Navbar;
