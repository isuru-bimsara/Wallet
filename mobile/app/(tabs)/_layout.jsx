// // // mobile/app/%28tabs%29/-layout.jsx
// // import { Tabs } from 'expo-router';
// // import { Ionicons } from '@expo/vector-icons';

// // export default function TabsLayout() {
// //   return (
// //     <Tabs
// //       screenOptions={{
// //         tabBarActiveTintColor: '#8B593E',
// //         tabBarInactiveTintColor: '#9A8478',
// //         tabBarStyle: {
// //           backgroundColor: '#FFF8F3',
// //           borderTopColor: '#E5D3B7',
// //           borderTopWidth: 1,
// //           height: 60,
// //           paddingBottom: 8,
// //           paddingTop: 8,
// //         },
// //         tabBarLabelStyle: {
// //           fontSize: 12,
// //           fontWeight: '600',
// //         },
// //         headerStyle: {
// //           backgroundColor: '#FFF8F3',
// //         },
// //         headerTintColor: '#4A3428',
// //         headerTitleStyle: {
// //           fontWeight: 'bold',
// //         },
// //       }}
// //     >
// //       <Tabs.Screen
// //         name="index"
// //         options={{
// //           title: 'Home',
// //           tabBarIcon: ({ color, size }) => (
// //             <Ionicons name="home" size={size} color={color} />
// //           ),
// //         }}
// //       />

// //       <Tabs.Screen
// //         name="create"
// //         options={{
// //           title: 'Statistics',
// //           tabBarIcon: ({ color, size }) => (
// //             <Ionicons name="stats-chart" size={size} color={color} />
// //           ),
// //         }}
// //       />

// //     </Tabs>
// //   );
// // }

// // mobile/app/%28tabs%29/-layout.jsx
// import { Tabs } from "expo-router";
// import { Ionicons } from "@expo/vector-icons";

// export default function TabsLayout() {
//   return (
//     <Tabs
//       screenOptions={{
//         tabBarActiveTintColor: "#8B593E",
//         tabBarInactiveTintColor: "#9A8478",
//         tabBarStyle: {
//           backgroundColor: "#FFF8F3",
//           borderTopColor: "#E5D3B7",
//           borderTopWidth: 1,
//           height: 60,
//           paddingBottom: 8,
//           paddingTop: 8,
//         },
//         tabBarLabelStyle: {
//           fontSize: 12,
//           fontWeight: "600",
//         },
//         headerStyle: {
//           backgroundColor: "#FFF8F3",
//         },
//         headerTintColor: "#4A3428",
//         headerTitleStyle: {
//           fontWeight: "bold",
//         },
//       }}
//     >
//       {/* Home Tab */}
//       <Tabs.Screen
//         name="index"
//         options={{
//           title: "Home",
//           headerShown: false,
//           tabBarIcon: ({ color, size }) => (
//             <Ionicons name="home" size={size} color={color} />
//           ),
//         }}
//       />

//       {/* Add Tab */}
//       <Tabs.Screen
//         name="create"
//         options={{
//           title: "Add", // ✅ Changed from "Statistics" to "Add"
//           headerShown: false,
//           tabBarIcon: ({ color, size }) => (
//             <Ionicons name="add-circle" size={size} color={color} />
//           ),
//         }}
//       />
//     </Tabs>
//   );
// }

// mobile/app/%28tabs%29/-layout.jsx
import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#8B593E",
        tabBarInactiveTintColor: "#9A8478",
        tabBarStyle: {
          backgroundColor: "#FFF8F3",
          borderTopColor: "#E5D3B7",
          borderTopWidth: 1,
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "600",
        },
        headerStyle: {
          backgroundColor: "#FFF8F3",
        },
        headerTintColor: "#4A3428",
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    >
      {/* Home Tab */}
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />

      {/* Add Tab */}
      <Tabs.Screen
        name="create"
        options={{
          title: "Add",
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="add-circle" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
