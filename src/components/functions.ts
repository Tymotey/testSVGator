const returnStepClasses = (currentStep: number, activeStep: number) =>{
    return {
        'step-past': activeStep >= currentStep,
        'step-disabled': activeStep < currentStep
    }
}

const fileExtensionsToMime = (extensions: string) =>{
    const mimes = [] as String[]

    const extensionsToArray = extensions.split(',')
    extensionsToArray.forEach((extension) => {
        switch(extension){
            case 'svg': mimes.push('image/svg+xml'); break;
            case 'jpeg':
            case 'jpg': mimes.push('image/jpeg'); break;
            case 'png': mimes.push('image/png'); break;
        }
    });


    return mimes
}

async function readText(file: File) {
    const text = await file.text();
    
    return text
}


function downloadOnFly(fileContent:string, name: string = 'animation.json', mine: string = 'application/json') {
    const blobContent = new Blob([fileContent], { type: mine });
    const elementA = document.createElement('a');
    elementA.download = name;
    elementA.href = window.URL.createObjectURL(blobContent);
    elementA.click();
}

export { returnStepClasses, fileExtensionsToMime, readText, downloadOnFly }