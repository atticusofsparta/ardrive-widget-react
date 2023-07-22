import { DriveStructure, GqlResultTagArray, TagsObject } from '../types';

export const ARFS_ID_REGEX = new RegExp(
  '^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$',
);
export const ARNS_TXID_REGEX = new RegExp('^[a-zA-Z0-9-_]{43}$');
export const TEST_DRIVE_ID = 'feb06a23-7447-4efe-977c-c361edae5fd7';

export const DARK_THEME = {
  primary: '#FE0230',
  secondary: '#FFFFFF',
  background: '#1F1F1F',
  foreground: '#FFFFFF',
  foreground_muted: '#EEEEEE',
  text: '#FFFFFF',
  text_subtle: '9E9E9E',
  input_text: '#424242',
  input_placeholder: '#616161',
  success: '#5DC389',
  warning: '#F5A623',
  error: '#DF1642',
  info: '#3142c4',
  shadow: 'rgba(0, 0, 5px, 0.5)',
};

export const LIGHT_THEME = {
  primary: '#FE0230',
  secondary: '#171717',
  background: '#FFFFFF',
  foreground: '#FFFFFF',
  foreground_muted: '#EEEEEE',
  text: '#FFFFFF',
  text_subtle: '9E9E9E',
  input_text: '#424242',
  input_placeholder: '#616161',
  success: '#5DC389',
  warning: '#F5A623',
  error: '#DF1642',
  info: '#3142c4',
  shadow: 'rgba(0, 0, 5px, 0.5)',
};

export function tagsToObject({
  tags,
}: {
  tags: GqlResultTagArray;
}): TagsObject {
  const tagObject: { [x: string]: string } = {};
  tags.map((tag) => (tagObject[tag.name] = tag.value));
  return tagObject;
}
