import { MagnifyingGlassIcon } from '@radix-ui/react-icons';
import { Button, TextField } from '@radix-ui/themes';
import { CSSProperties, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

function Search({
  submitCallback,
  onChangeCallback,
  style,
}: {
  style?: CSSProperties;
  submitCallback?: (query: string) => void;
  onChangeCallback?: (query: string) => void;
}) {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchParams, setSearchparams] = useSearchParams();

  useEffect(() => {
    const urlSearchQuery = searchParams.get('search') || '';
    if (urlSearchQuery !== searchQuery) {
      setSearchQuery(urlSearchQuery);
    }
  }, [searchParams]);

  function handleSearch(e: any) {
    e.preventDefault();
    if (submitCallback) {
      submitCallback(searchQuery);
    }
    if (searchQuery !== searchParams.get('search')) {
      setSearchparams({ search: searchQuery });
    }
    alert('Search button clicked');
  }

  function handleSearchChange(e: any) {
    e.preventDefault();
    const query = e.target.value;
    if (onChangeCallback) {
      onChangeCallback(query);
    }
    if (!query.length) {
      setSearchparams({});
    }
    setSearchQuery(e.target.value);
  }

  return (
    <TextField.Root style={{ width: '50%' }}>
      <TextField.Input
        placeholder="Search for a thingymajigger"
        onKeyDown={(e) => (e.key === 'Enter' ? handleSearch(e) : null)}
        onChange={handleSearchChange}
        value={searchQuery}
        maxLength={100}
        style={style}
        radius="full"
      />
      <TextField.Slot>
        <Button
          variant="ghost"
          radius="full"
          onClick={handleSearch}
          style={{ marginRight: '1px' }}
        >
          <MagnifyingGlassIcon height="16" width="16" />
        </Button>
      </TextField.Slot>
    </TextField.Root>
  );
}

export default Search;
