import MatchingEngine from '../components/MatchingEngine';
export default function MatchAlphabets() {
    return <MatchingEngine type="alphabets" leftItems={['A','B','C']} rightItems={['B','C','A']} />;
}