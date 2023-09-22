document.addEventListener("DOMContentLoaded", function () {
    const playerHealthDisplay = document.getElementById("player-health");
    const dragonHealthDisplay = document.getElementById("dragon-health");
    const playerHealthBar = document.getElementById("player-health-bar");
    const dragonHealthBar = document.getElementById("dragon-health-bar");
    const playerAttackButton = document.getElementById("player-attack");
    const specialAttackButton = document.getElementById("special-attack");
    const healButton = document.getElementById("heal");
    const dragonAttackButton = document.getElementById("dragon-attack");
    const turnMessage = document.getElementById("turn-message");
    const toastMessage = document.getElementById("toast-message");
    const toastText = document.getElementById("toast-text");
    const restartButton = document.getElementById("restart-button");

    let playerHealth = 100;
    let dragonHealth = 100;
    let isPlayerTurn = true;
    let gameOver = false;
    let specialAttackCount = 2;

    const restartGame = () => {
        playerHealth = 100;
        dragonHealth = 100;
        isPlayerTurn = true;
        gameOver = false;
        specialAttackCount = 2;
        playerHealthDisplay.textContent = dragonHealthDisplay.textContent = playerHealth;
        playerHealthBar.style.width = dragonHealthBar.style.width = playerHealth + "%";
        [playerHealthBar, dragonHealthBar].forEach(bar => updateHealthBarColor(bar, playerHealth));
        toastMessage.style.display = "none";
        updateTurnMessage();
        updateSpecialAttackButton();
    };

    restartButton.addEventListener("click", restartGame);

    const showToast = (message, backgroundColor) => {
        toastText.textContent = message;
        toastMessage.style.display = "block";
        toastMessage.style.backgroundColor = backgroundColor;
        setTimeout(() => {
            toastMessage.style.display = "none";
        }, 10000);
    };

    const checkGameStatus = () => {
        if (playerHealth <= 0) {
            showToast("Dragon wins! Player defeated!", "Blue");
            gameOver = true;
        } else if (dragonHealth <= 0) {
            showToast("Player wins! Dragon defeated!", "Blue");
            gameOver = true;
        }
    };

    const updateSpecialAttackButton = () => {
        showToast(`Special Attack (${specialAttackCount} left)`, "Blue");
    };

    const dragonTurn = () => {
        if (gameOver) return;
        const dragonDamage = Math.floor(Math.random() * 15) + 1;
        playerHealth -= dragonDamage;
        playerHealthDisplay.textContent = playerHealth;
        showToast(`Dragon attacked Player for ${dragonDamage} damage!`, "red");
        playerHealthBar.style.width = playerHealth + "%";
        updateHealthBarColor(playerHealthBar, playerHealth);
        checkGameStatus();
        isPlayerTurn = true;
        updateTurnMessage();
    };

    const updateTurnMessage = () => {
        turnMessage.textContent = gameOver ? "Game Over" : (isPlayerTurn ? "Player's Turn" : "Dragon's Turn");
    };

    const updateHealthBarColor = (healthBar, healthValue) => {
        healthBar.style.backgroundColor = healthValue <= 20 ? "red" : "#4caf50";
    };

    playerAttackButton.addEventListener("click", () => {
        if (gameOver || !isPlayerTurn) return;
        const playerDamage = Math.floor(Math.random() * 20) + 1;
        dragonHealth -= playerDamage;
        dragonHealthDisplay.textContent = dragonHealth;
        showToast(`Player attacked Dragon for ${playerDamage} damage!`, "green");
        dragonHealthBar.style.width = dragonHealth + "%";
        updateHealthBarColor(dragonHealthBar, dragonHealth);
        checkGameStatus();
        if (!gameOver) {
            isPlayerTurn = false;
            setTimeout(dragonTurn, 1000);
            updateTurnMessage();
        }
    });

    specialAttackButton.addEventListener("click", () => {
        if (gameOver || !isPlayerTurn) return;
        if (specialAttackCount <= 0 ) {
            showToast(`No SpecialAttack Left` , "Purple");
            return; 
        }
        const specialDamage = Math.floor(Math.random() * 30) + 10;
        dragonHealth -= specialDamage;
        dragonHealthDisplay.textContent = dragonHealth;
        showToast(`Player used a Special Attack for ${specialDamage} damage!`, "Purple");
        dragonHealthBar.style.width = dragonHealth + "%";
        updateHealthBarColor(dragonHealthBar, dragonHealth);
        checkGameStatus();
        if (!gameOver) {
            isPlayerTurn = false;
            specialAttackCount--;
            updateSpecialAttackButton();
            setTimeout(dragonTurn, 1000);
            updateTurnMessage();
        }
    });

    healButton.addEventListener("click", () => {
        if (gameOver || !isPlayerTurn) return;
        const healAmount = Math.floor(Math.random() * 20) + 10;
        playerHealth += healAmount;
        if (playerHealth > 100) playerHealth = 100;
        playerHealthDisplay.textContent = playerHealth;
        showToast(`Player used a Health Potion and gained ${healAmount} health.`, "blue");
        playerHealthBar.style.width = playerHealth + "%";
        updateHealthBarColor(playerHealthBar, playerHealth);
        if (!gameOver) {
            isPlayerTurn = false;
            setTimeout(dragonTurn, 1000);
            updateTurnMessage();
        }
    });

    dragonAttackButton.addEventListener("click", () => {
        if (gameOver || isPlayerTurn) return;
        const dragonDamage = Math.floor(Math.random() * 15) + 1;
        playerHealth -= dragonDamage;
        playerHealthDisplay.textContent = playerHealth;
        showToast(`Dragon attacked Player for ${dragonDamage} damage!`, "red");
        playerHealthBar.style.width = playerHealth + "%";
        updateHealthBarColor(playerHealthBar, playerHealth);
        checkGameStatus();
        isPlayerTurn = true;
        updateTurnMessage();
    });
});
