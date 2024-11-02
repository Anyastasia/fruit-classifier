import { defineStore } from "pinia";
import { ref } from "vue";

export const useThemeStore = defineStore("theme", () => {
  const mode = ref("dark")

  const changeTheme = () => {
    if (mode.value == "dark") {
      mode.value = "light"
    } else {
      mode.value = "dark"
    }
  }

  return {mode, changeTheme}
})
