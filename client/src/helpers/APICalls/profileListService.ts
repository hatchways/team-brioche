import { Profile } from '../../interface/Profile';
import getMock from '../../mocks/mockProfile';

export async function getList(): Promise<Profile[]> {
  return await Promise.resolve(getMock());
}
