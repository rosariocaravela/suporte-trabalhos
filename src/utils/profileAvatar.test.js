import test from 'node:test';
import assert from 'node:assert/strict';
import { buildProfileAvatarPath, isValidProfileImage } from './profileAvatar.js';

test('buildProfileAvatarPath creates a stable upload path', () => {
  const path = buildProfileAvatarPath('123e4567-e89b-12d3-a456-426614174000', 'avatar.png');
  assert.match(path, /^123e4567-e89b-12d3-a456-426614174000\//);
  assert.match(path, /avatar\.png$/);
});

test('rejects invalid profile image types and oversized files', () => {
  const invalidType = isValidProfileImage({ type: 'application/pdf', size: 1024 });
  const tooLarge = isValidProfileImage({ type: 'image/jpeg', size: 6 * 1024 * 1024 });

  assert.equal(invalidType.valid, false);
  assert.equal(tooLarge.valid, false);
});
