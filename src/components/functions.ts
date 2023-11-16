const returnStepClasses = (currentStep: number, activeStep: number) =>{
    return {
        'step-past': activeStep >= currentStep,
        'step-disabled': activeStep < currentStep
    }
}

export { returnStepClasses }