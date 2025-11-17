import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Switch,
  Image,
} from 'react-native';
import { useConfig } from '../services/configManager';
import { getInitials } from '../utils/utilFunc';


// SettingsScreen - Static settings page with profile and preferences

const SettingsScreen = ({ navigation }) => {
  const { config } = useConfig();
  
  // Static settings state (not connected to backend yet)
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [readReceipts, setReadReceipts] = useState(true);
  const [onlineStatus, setOnlineStatus] = useState(true);
  const [autoDownload, setAutoDownload] = useState(false);

  // Static profile data
  const profileData = {
    name: 'John Doe',
    phone: '+91 12345 67890',
    email: 'abc@example.com',
    status: 'Hello, did you try Ira by Rumik?',
  };

  const SectionHeader = ({ title }) => (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionHeaderText}>{title}</Text>
    </View>
  );

  const SettingsToggle = ({ title, subtitle, value, onValueChange, icon }) => (
    <View style={styles.settingsItem}>
      <View style={styles.settingsItemLeft}>
        {icon && <Text style={styles.settingsIcon}>{icon}</Text>}
        <View style={styles.settingsItemText}>
          <Text style={styles.settingsItemTitle}>{title}</Text>
          {subtitle && <Text style={styles.settingsItemSubtitle}>{subtitle}</Text>}
        </View>
      </View>
      <Switch
        value={value}
        onValueChange={onValueChange}
        trackColor={{ false: '#D0D0D0', true: config.theme.primaryColor }}
        thumbColor={value ? '#FFFFFF' : '#F4F4F4'}
      />
    </View>
  );

  const SettingsButton = ({ title, subtitle, icon, onPress, showArrow = true }) => (
    <TouchableOpacity style={styles.settingsItem} onPress={onPress}>
      <View style={styles.settingsItemLeft}>
        {icon && <Text style={styles.settingsIcon}>{icon}</Text>}
        <View style={styles.settingsItemText}>
          <Text style={styles.settingsItemTitle}>{title}</Text>
          {subtitle && <Text style={styles.settingsItemSubtitle}>{subtitle}</Text>}
        </View>
      </View>
      {showArrow && <Text style={styles.arrowIcon}>›</Text>}
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Profile Section */}
      <View style={styles.profileSection}>
        <TouchableOpacity style={styles.profileImageContainer}>
          <View style={[styles.profileImage, { backgroundColor: config.theme.primaryColor }]}>
            <Text style={styles.profileImageText}>
              {getInitials(profileData.name)}
            </Text>
          </View>
        </TouchableOpacity>
        
        <Text style={styles.profileName}>{profileData.name}</Text>
        <Text style={styles.profileStatus}>{profileData.status}</Text>
      </View>

      {/* Account Section */}
      <SectionHeader title="Account" />
      <View style={styles.settingsGroup}>
        <SettingsButton
          icon="📱"
          title="Phone"
          subtitle={profileData.phone}
          onPress={() => console.log('Phone pressed')}
        />
        <View style={styles.separator} />
        <SettingsButton
          icon="✉️"
          title="Email"
          subtitle={profileData.email}
          onPress={() => console.log('Email pressed')}
        />
        <View style={styles.separator} />
        <SettingsButton
          icon="👤"
          title="Username"
          subtitle="@johndoe"
          onPress={() => console.log('Username pressed')}
        />
      </View>

      {/* Appearance Section */}
      <SectionHeader title="Appearance" />
      <View style={styles.settingsGroup}>
        <SettingsToggle
          icon="🌙"
          title="Dark Mode"
          subtitle="Enable dark theme"
          value={darkMode}
          onValueChange={setDarkMode}
        />
        <View style={styles.separator} />
        <SettingsButton
          icon="🎨"
          title="Chat Wallpaper"
          subtitle="Change background"
          onPress={() => console.log('Wallpaper pressed')}
        />
        <View style={styles.separator} />
        <SettingsButton
          icon="📏"
          title="Font Size"
          subtitle="Medium"
          onPress={() => console.log('Font size pressed')}
        />
      </View>

      {/* Notifications Section */}
      <SectionHeader title="Notifications" />
      <View style={styles.settingsGroup}>
        <SettingsToggle
          icon="🔔"
          title="Notifications"
          subtitle="Show notifications for new messages"
          value={notifications}
          onValueChange={setNotifications}
        />
        <View style={styles.separator} />
        <SettingsToggle
          icon="🔊"
          title="Sound"
          subtitle="Play sound for notifications"
          value={soundEnabled}
          onValueChange={setSoundEnabled}
        />
        <View style={styles.separator} />
        <SettingsButton
          icon="📳"
          title="Vibration"
          subtitle="Vibrate on new messages"
          onPress={() => console.log('Vibration pressed')}
        />
      </View>

      {/* Help & Support Section */}
      <SectionHeader title="Help & Support" />
      <View style={styles.settingsGroup}>
        <SettingsButton
          icon="❓"
          title="Help Center"
          subtitle="Get help and support"
          onPress={() => console.log('Help pressed')}
        />
        <View style={styles.separator} />
        <SettingsButton
          icon="📧"
          title="Contact Us"
          subtitle="Send us feedback"
          onPress={() => console.log('Contact pressed')}
        />
        <View style={styles.separator} />
        <SettingsButton
          icon="⭐"
          title="Rate App"
          subtitle="Rate us on Play Store"
          onPress={() => console.log('Rate pressed')}
        />
      </View>

      {/* About Section */}
      <SectionHeader title="About" />
      <View style={styles.settingsGroup}>
        <SettingsButton
          icon="ℹ️"
          title="App Version"
          subtitle="1.0.0"
          onPress={() => console.log('Version pressed')}
          showArrow={false}
        />
        <View style={styles.separator} />
        <SettingsButton
          icon="📄"
          title="Terms of Service"
          onPress={() => console.log('Terms pressed')}
        />
        <View style={styles.separator} />
        <SettingsButton
          icon="🔒"
          title="Privacy Policy"
          onPress={() => console.log('Privacy policy pressed')}
        />
      </View>

      {/* Logout Button */}
      <TouchableOpacity 
        style={styles.logoutButton}
        onPress={() => console.log('Logout pressed')}
      >
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>

      {/* Bottom Padding */}
      <View style={styles.bottomPadding} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  profileSection: {
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    paddingVertical: 32,
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  profileImageContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  profileImageText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 4,
  },
  profileStatus: {
    fontSize: 14,
    color: '#666666',
    textAlign: 'center',
  },
  sectionHeader: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: '#F5F5F5',
  },
  sectionHeaderText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2196F3',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  settingsGroup: {
    backgroundColor: '#FFFFFF',
    marginBottom: 20,
  },
  settingsItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 20,
    minHeight: 60,
  },
  settingsItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingsIcon: {
    fontSize: 24,
    marginRight: 16,
    width: 30,
    textAlign: 'center',
  },
  settingsItemText: {
    flex: 1,
  },
  settingsItemTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000000',
    marginBottom: 2,
  },
  settingsItemSubtitle: {
    fontSize: 14,
    color: '#666666',
  },
  arrowIcon: {
    fontSize: 28,
    color: '#CCCCCC',
    marginLeft: 12,
  },
  separator: {
    height: 1,
    backgroundColor: '#F0F0F0',
    marginLeft: 66,
  },
  logoutButton: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginTop: 10,
    marginBottom: 20,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#F44336',
  },
  logoutButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#F44336',
  },
  bottomPadding: {
    height: 40,
  },
});

export default SettingsScreen;
