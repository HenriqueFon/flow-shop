import { Result } from '../Result/Result';
import { PrePackageTable } from '../PrePackageTable/PrePackageTable';
import './PkgForm.css'
import { useState } from "react";


export function PkgForm() {

    const [packages, setPackages] = useState([]);
    const [dependencies, setDependencies] = useState("")
    const [packageSize, setPackageSize] = useState("")
    const [instalationTime, setInstalationTime] = useState("")
    const [packageNumber, setPackageNumber] = useState(0)
    const [showResults, setShowResults] = useState(false);
    const [showCreatedPackages, setShowCreatedPackages] = useState(true);


    const handleDependencies = (event) => {
        setDependencies(event.target.value);
    }

    const handleTime = (event) => {
        setInstalationTime(event.target.value);
    }

    const handleSize = (event) => {
        setPackageSize(event.target.value);
    }

    const handleSubmit = (event) => {
        if(validateMaxPackages()) {
            event.preventDefault();

            const newPackage = {
                "Dependencies": dependencies,
                "Installation_Time": instalationTime,
                "Package": `Package_${packageNumber}`,
                "Package_Size": packageSize
            };

            let number = packageNumber + 1;

            setPackageNumber(number);

            setPackages([...packages, newPackage]);

            // Clear the form fields
            // setDependencies("");
            // setPackageSize("");
            // setInstalationTime("");
        }
    }

    const handleRandomSubmit = (event) => {

        if(validateMaxPackages()) {
            event.preventDefault();

            const randomDependencies = Math.floor(Math.random() * 10) 
            + 1; // Random value between 1 and 10
            const randomPackageSize = Math.floor(Math.random() * 91) 
            + 10; // Random value between 10 and 100
            const randomInstallationTime = Math.floor(Math.random() * 91) 
            + 10; // Random value between 10 and 100

            const newPackage = {
                "Dependencies": randomDependencies,
                "Installation_Time": randomPackageSize,
                "Package": `Package_${packageNumber}`,
                "Package_Size": randomInstallationTime
            };

            let number = packageNumber + 1;

            setPackageNumber(number);

            setPackages([...packages, newPackage]);

            // Clear the form fields
            // setDependencies("");
            // setPackageSize("");
            // setInstalationTime("");
        }
    }

    const validateMaxPackages = () => {
        if(packages.length < 100) {
            return true;
        }

        return false;
    }

    const handleOptimize = (event) => {
        if(packages.length != 0) {
            event.preventDefault();

            setShowCreatedPackages(false)
            setShowResults(true)
        }
    }

    const handleBack = (event) => {
        event.preventDefault();
        setPackages("");
        setShowResults(false);
        setShowCreatedPackages(true)
    }

    return (
        <>
        { showResults == false && <div className = 'packageForm'>
                <form onSubmit = {handleSubmit}>
                    <div>
                        <label for = "dependencies">Dependências</label>
                        <input type = "number"
                            name = "dependencies"
                            onChange = {handleDependencies}
                        required/>
                    </div>
                    <div>
                        <label for = "size">Tamanho</label>
                        <input type = "number"
                            name = "size"
                            onChange = {handleSize}
                        required/>
                    </div>
                    <div>
                        <label for = "time">Tempo</label>
                        <input type = "number"
                            name = "time"
                            onChange = {handleTime}
                        required/>
                    </div>
                    <button>Criar pacote</button>
                </form>
                <div className = "randomButton">
                    <input type = "button" 
                    value = "Aleatório" 
                    onClick = {handleRandomSubmit}></input>
                </div>
                <div className = "OptimizeButton">
                    <input type = "button" 
                    value = "Otimizar" 
                    onClick = {handleOptimize}></input>
                </div>
        </div> }
        {packages.length == 10 && <p>Limite de pacotes excedido, máximo 10</p>}
        <div>
            { showCreatedPackages == true && packages.length != 0 && <PrePackageTable data = { packages }/> }
        </div>
        <div>
            { showResults == true && <Result packages = { packages }/> }
        </div>
        <div>
            { showResults == true && <input type = "button" 
            value = "Voltar" 
            onClick = {handleBack}></input> }
        </div>
        </>
    )   
}