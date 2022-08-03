export interface TokensModalProps {
    tokenModal: boolean;
    setTokenModal: (tokenModal: boolean) => void;
    buttonFlag: string;
    setPrimarySelected: (primarySelected: boolean) => void;
    setSecondarySelected: (secondarySelected: boolean) => void;
}