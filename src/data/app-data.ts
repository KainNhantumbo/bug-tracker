import Package from '../../package.json';

export const themeOptions: { code: string; name: string }[] = [
  { code: 'light-default', name: 'Light (Default)' },
  { code: 'dark-default', name: 'Dark (Default)' },
  { code: 'dark-rumble', name: 'Dark Rumble' },
  { code: 'dark-drackula', name: 'Dark Drackula' },
];

export const sortOptions: { code: string; name: string }[] = [
  { code: 'title', name: 'Title' },
  { code: '-title', name: 'Title (descending)' },
  { code: 'reporter', name: 'Reporter' },
  { code: '-reporter', name: 'Reporter (descending)' },
  { code: 'status', name: 'Status' },
  { code: '-status', name: 'Status (descending)' },
  { code: 'createdAt', name: 'Created' },
  { code: '-createdAt', name: 'Created (descending)' },
];

export const app_metadata = {
  appName: Package.metadata.name,
  version: Package.version,
  license: Package.license,
  copyright: `© ${new Date().getFullYear()} - ${Package.author.name}`,
};
