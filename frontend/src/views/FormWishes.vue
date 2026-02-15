<script setup>
import { ref } from "vue";

const formData = ref({
  name: "",
  image: null,
  blessing: "",
});

const imagePreview = ref(null);
const submitted = ref(false);
const errors = ref({});

const handleImageChange = (event) => {
  const file = event.target.files[0];
  if (file) {
    formData.value.image = file;
    const reader = new FileReader();
    reader.onloadend = () => {
      imagePreview.value = reader.result;
    };
    reader.readAsDataURL(file);
  }
};

const removeImage = () => {
  formData.value.image = null;
  imagePreview.value = null;
};

const validateForm = () => {
  errors.value = {};

  if (!formData.value.name.trim()) {
    errors.value.name = "Please enter your name";
  }

  if (!formData.value.blessing.trim()) {
    errors.value.blessing = "Please enter your wishes";
  }

  return Object.keys(errors.value).length === 0;
};

const handleSubmit = () => {
  if (validateForm()) {
    submitted.value = true;

    // จำลองการส่งข้อมูล
    console.log("Form submitted:", {
      name: formData.value.name,
      blessing: formData.value.blessing,
      hasImage: !!formData.value.image,
    });

    // รีเซ็ตฟอร์มหลัง 3 วินาที
    setTimeout(() => {
      submitted.value = false;
      formData.value = { name: "", image: null, blessing: "" };
      imagePreview.value = null;
      errors.value = {};
    }, 3000);
  }
};
</script>

<template>
  <div
    class="relative w-full p-4 sm:p-8 min-h-screen bg-gradient-to-br from-indigo-400 via-purple-400 to-pink-400 overflow-hidden"
  >


    <!-- Wavy layers -->
    <div class="pointer-events-none -z-50 absolute inset-0 opacity-30">
      <svg
        class="absolute bottom-0 w-full"
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
      >
        <path
          fill="#ffffff"
          fill-opacity="0.3"
          d="M0,160L48,144C96,128,192,96,288,106.7C384,117,480,171,576,181.3C672,192,768,160,864,149.3C960,139,1056,149,1152,144C1248,139,1344,117,1392,106.7L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
        ></path>
      </svg>
    </div>

    <!-- Gradient orbs -->
    <div
      class="absolute top-20 -left-20 w-96 h-96 bg-gradient-to-br from-yellow-300/40 to-pink-300/40 rounded-full blur-3xl animate-pulse"
      style="animation-duration: 4s"
    ></div>
    <div
      class="absolute -top-20 right-10 w-80 h-80 bg-gradient-to-br from-blue-300/30 to-purple-300/30 rounded-full blur-3xl animate-pulse"
      style="animation-duration: 5s"
    ></div>

    <!-- Sparkle particles -->
    <div
      class="absolute top-32 left-1/4 text-3xl opacity-80 animate-pulse"
      style="animation-duration: 2s"
    >
      ✨
    </div>
    <div
      class="absolute top-1/3 right-1/4 text-2xl opacity-70 animate-bounce"
      style="animation-duration: 3s"
    >
      🕯️
    </div>
    <div
      class="absolute bottom-1/3 left-1/3 text-xl opacity-60 animate-pulse"
      style="animation-duration: 2.5s"
    >
      💫
    </div>

    <!-- Main Content -->
    <div class="relative z-10 max-w-2xl mx-auto">

      <!-- Header -->
      <div class="text-center mb-8">
        <div class="text-5xl sm:text-6xl mb-4">🕯️</div>
        <h1 class="text-3xl sm:text-4xl font-bold text-white mb-2">
          Write a wish
        </h1>
        <p class="text-white/90 text-base sm:text-lg">
          A cozy space for friends, alumni, and the SIT family to create unique
          candle cakes in the workshop, show off their
        </p>
      </div>

      <!-- Form Card -->
      <div
        v-if="!submitted"
        class="card bg-white/95 backdrop-blur-sm shadow-2xl"
      >
        <div class="card-body p-6 sm:p-8">
          <form @submit.prevent="handleSubmit" class="space-y-6">
            <!-- ชื่อผู้โพสต์ (Required) -->
            <div class="form-control">
              <label class="label">
                <span class="label-text text-lg font-semibold text-purple-900">
                  Your Name
                  <span class="text-error">*</span>
                </span>
              </label>
              <input
                v-model="formData.name"
                type="text"
                placeholder="Enter your name"
                class="input input-bordered input-primary w-full"
                :class="{ 'input-error': errors.name }"
              />
              <label v-if="errors.name" class="label">
                <span class="label-text-alt text-error">{{ errors.name }}</span>
              </label>
            </div>

            <!-- รูปภาพ (Optional) -->
            <div class="form-control">
              <label class="label">
                <span class="label-text text-lg font-semibold text-purple-900">
                  Candle Image
                  <span class="text-sm font-normal text-gray-500"
                    >(Optional)</span
                  >
                </span>
              </label>

              <div
                v-if="!imagePreview"
                class="relative border-2 border-dashed border-purple-300 rounded-lg p-8 text-center hover:border-purple-500 transition-colors cursor-pointer bg-purple-50/50"
              >
                <input
                  type="file"
                  accept="image/*"
                  @change="handleImageChange"
                  class="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <div class="text-5xl mb-3">📷</div>
                <p class="text-purple-700 font-medium">Upload an Image</p>
                <p class="text-sm text-gray-500 mt-1">
                  PNG, JPG, GIF (Max 5MB)
                </p>
              </div>

              <div v-else class="relative">
                <img
                  :src="imagePreview"
                  alt="Preview"
                  class="w-full h-64 object-cover rounded-lg shadow-lg"
                />
                <button
                  type="button"
                  @click="removeImage"
                  class="btn btn-circle btn-sm btn-error absolute top-2 right-2 shadow-lg"
                >
                  ✕
                </button>
              </div>
            </div>

            <!-- คำอวยพร (Required) -->
            <div class="form-control">
              <label class="label">
                <span class="label-text text-lg font-semibold text-purple-900">
                  Blessings for the SIT
                  <span class="text-error">*</span>
                </span>
              </label>
              <textarea
                v-model="formData.blessing"
                placeholder="Write your wishes here..."
                class="textarea textarea-bordered textarea-primary h-32 w-full"
                :class="{ 'textarea-error': errors.blessing }"
              ></textarea>
              <label v-if="errors.blessing" class="label">
                <span class="label-text-alt text-error">{{
                  errors.blessing
                }}</span>
              </label>
            </div>

            <!-- Submit Button -->
            <button
              type="submit"
              class="cursor-pointer p-4 bg-linear-to-br from-blue-500 rounded-2xl text-white to-purple-500 w-full text-lg font-semibold shadow-lg hover:shadow-xl transition-all hover:scale-101"
            >
              Share your wish
            </button>
          </form>
        </div>
      </div>

      <!-- Success Message -->
      <div v-else class="card bg-white/95 backdrop-blur-sm shadow-2xl">
        <div class="card-body p-8 text-center">
          <div class="text-7xl mb-4 animate-bounce">✨</div>
          <h2 class="text-3xl font-bold text-purple-700 mb-3">
            ส่งคำอวยพรสำเร็จ!
          </h2>
          <p class="text-gray-600 text-lg">
            ขอบคุณสำหรับคำอวยพรดีๆ ให้กับคณะ SIT
          </p>
          <div class="mt-4">
            <div class="loading loading-dots loading-lg text-primary"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.animate-pulse {
  animation: pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

.animate-bounce {
  animation: bounce 3s infinite;
}

@keyframes pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

@keyframes bounce {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-25px);
  }
}
</style>
