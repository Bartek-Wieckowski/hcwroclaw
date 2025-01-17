import HeaderWrapper from '../HeaderWrapper';
import HeaderContent from '../HeaderContent';

export default function HeaderHomepage() {
  return (
    <HeaderWrapper isHomePage={true}>
      <HeaderContent variant="homepage" />
    </HeaderWrapper>
  );
}
