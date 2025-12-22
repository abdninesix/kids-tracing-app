import MatchingEngine from '../components/MatchingEngine';
export default function MatchCounting() {
    return <MatchingEngine type="numbers" leftItems={['1','2','3']} rightItems={['3','1','2']} />;
}