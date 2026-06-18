type ComplianceFooterProps = {
  compliance: string;
};

export function ComplianceFooter({ compliance }: ComplianceFooterProps) {
  return (
    <footer className="mt-2 px-2 pb-2 text-center">
      <p className="mx-auto max-w-[400px] text-[11px] leading-relaxed text-muted-dark">
        {compliance}
      </p>
    </footer>
  );
}
