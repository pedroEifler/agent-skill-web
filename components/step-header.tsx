interface StepHeaderProps {
  currentStep: number
  totalSteps: number
  title: string
  description: string
}

export function StepHeader({ currentStep, totalSteps, title, description }: StepHeaderProps) {
  return (
    <div className="mb-8 text-center">
      <div className="mb-4 flex items-center justify-center gap-2">
        {Array.from({ length: totalSteps }).map((_, index) => (
          <div
            key={index}
            className={`h-2 w-8 rounded-full transition-colors ${
              index < currentStep
                ? "bg-primary"
                : index === currentStep
                ? "bg-primary/50"
                : "bg-muted"
            }`}
          />
        ))}
      </div>
      <p className="mb-2 text-sm text-muted-foreground">
        Passo {currentStep + 1} de {totalSteps}
      </p>
      <h1 className="text-2xl font-bold text-foreground">{title}</h1>
      <p className="mt-2 text-muted-foreground">{description}</p>
    </div>
  )
}
