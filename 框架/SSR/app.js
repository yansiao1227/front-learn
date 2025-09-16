import { createSSRApp, ref, onMounted, computed } from "vue";
export function createApp() {
  const app = createSSRApp({
    setup() {
      const allData = ref([]);
      const pageSize = 20;
      const currentPage = ref(1);

      const paginatedData = computed(() => {
        const start = (currentPage.value - 1) * pageSize;
        const end = start + pageSize;
        return allData.value.slice(start, end);
      });

      const totalPages = computed(() =>
        Math.ceil(allData.value.length / pageSize)
      );

      const nextPage = () => {
        if (currentPage.value < totalPages.value) {
          currentPage.value++;
        }
      };

      const prevPage = () => {
        if (currentPage.value > 1) {
          currentPage.value--;
        }
      };

      onMounted(async () => {
        const response = await fetch("/data");
        allData.value = await response.json();
        console.log(allData.value);
      });
      return { paginatedData, currentPage, totalPages, nextPage, prevPage };
    },
    template: `
        <div>
          <table border="1" cellpadding="10" cellspacing="0">
            <thead>
              <tr>
                <th>订货号</th>
                <th>接点号</th>
                <th>层数</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in paginatedData" :key="index">
                <td>{{ item.ProductCode }}</td>
                <td>{{ item.ProductJointCode }}</td>
                <td>{{ item.LayerNum }}</td>
              </tr>
            </tbody>
          </table>
          <div>
            <button @click="prevPage" :disabled="currentPage === 1">上一页</button>
            <span>{{ currentPage }} / {{ totalPages }}</span>
            <button @click="nextPage" :disabled="currentPage === totalPages">下一页</button>
          </div>
        </div>
    `,
  });
  return app;
}
